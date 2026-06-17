<template>
  <nav class="tree-sidebar" aria-label="文档树状目录">
    <ul class="tree-root">
      <TreeNode
        v-for="(node, idx) in filteredTree"
        :key="idx"
        :node="node"
        :path="String(idx)"
        @toggle="handleToggle"
      />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, defineProps } from 'vue'

type RawGroup = {
  text?: string
  link?: string
  items?: RawGroup[]
}

const props = defineProps<{ sidebar: Record<string, RawGroup[]> | undefined }>()

// 接收来自顶部搜索栏的查询
const query = ref('')

if (typeof window !== 'undefined') {
  window.addEventListener('top-search-input', (e: any) => {
    query.value = (e?.detail?.query ?? '').toLowerCase()
  })
}

// 将 theme.sidebar (对象) 转为数组树（便于渲染）
function buildTree(sidebar: Record<string, RawGroup[]> | undefined) {
  if (!sidebar) return []
  const groups: RawGroup[] = []
  for (const k of Object.keys(sidebar)) {
    const list = sidebar[k] ?? []
    for (const g of list) {
      // group 可能有 items 或直接为页面条目
      groups.push({
        text: g.text ?? '',
        link: g.link,
        items: g.items ?? []
      })
    }
  }
  return groups
}

const tree = computed(() => buildTree(props.sidebar))

function nodeMatches(node: RawGroup, q: string): boolean {
  if (!q) return true
  const hay = `${node.text ?? ''} ${node.link ?? ''}`.toLowerCase()
  if (hay.includes(q)) return true
  if (node.items) {
    return node.items.some((c) => nodeMatches(c, q))
  }
  return false
}

const filteredTree = computed(() => {
  const q = query.value.trim()
  if (!q) return tree.value
  function filterNode(n: RawGroup): RawGroup | null {
    if (nodeMatches(n, q)) {
      const copy: RawGroup = { text: n.text, link: n.link }
      if (n.items && n.items.length) {
        const kids = n.items.map(filterNode).filter(Boolean) as RawGroup[]
        if (kids.length) copy.items = kids
      }
      return copy
    }
    return null
  }
  return tree.value.map(filterNode).filter(Boolean) as RawGroup[]
})

// 展开状态（key -> boolean），以及匹配状态（用于高亮）
const expanded = ref<Record<string, boolean>>({})

function handleToggle(path: string) {
  expanded.value[path] = !expanded.value[path]
  if (typeof window !== 'undefined') {
    ;(window as any).__TREE_EXPANDED = (window as any).__TREE_EXPANDED || {}
    ;(window as any).__TREE_EXPANDED[path] = expanded.value[path]
    window.dispatchEvent(new CustomEvent('tree-state-changed'))
  }
}

// 计算匹配路径与需要展开的父节点 —— 仅展开包含匹配项的分支
function computeMatchesAndExpanded() {
  const q = query.value.trim()
  ;(window as any).__TREE_MATCHES = {}
  ;(window as any).__TREE_EXPANDED = {}

  if (!q) {
    // no query: preserve nothing (user can manually expand)
    window.dispatchEvent(new CustomEvent('tree-state-changed'))
    return
  }

  function traverse(nodes: RawGroup[], prefix = ''): boolean {
    let subtreeHasMatch = false
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const path = prefix ? `${prefix}/${i}` : `${i}`
      const selfMatch = nodeMatches(n, q)
      let childHas = false
      if (n.items && n.items.length) {
        childHas = traverse(n.items, path)
      }
      if (selfMatch) {
        ;(window as any).__TREE_MATCHES[path] = true
      }
      if (childHas || selfMatch) {
        ;(window as any).__TREE_EXPANDED[path] = true
        subtreeHasMatch = true
      }
    }
    return subtreeHasMatch
  }

  traverse(filteredTree.value)
  window.dispatchEvent(new CustomEvent('tree-state-changed'))
}

watchEffect(() => {
  computeMatchesAndExpanded()
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    ;(window as any).__TREE_EXPANDED = (window as any).__TREE_EXPANDED || {}
    ;(window as any).__TREE_MATCHES = (window as any).__TREE_MATCHES || {}
    window.addEventListener('tree-toggle', (e: any) => {
      const p = e?.detail?.path
      if (!p) return
      ;(window as any).__TREE_EXPANDED[p] = !( (window as any).__TREE_EXPANDED[p] )
      window.dispatchEvent(new CustomEvent('tree-state-changed'))
    })
  }
})
</script>

<script lang="ts">
// 递归 TreeNode 组件（用 render-less 方式避免复杂依赖）
import { defineComponent, h, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'TreeSidebar',
  components: {},
})

// 注册全局子组件（局部定义）
const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    node: { type: Object as () => RawGroup, required: true },
    path: { type: String, required: true }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const expandedLocal = ref(false)
    const matchedLocal = ref(false)

    function updateFromGlobal() {
      const g = (typeof window !== 'undefined' && (window as any).__TREE_EXPANDED) || {}
      const m = (typeof window !== 'undefined' && (window as any).__TREE_MATCHES) || {}
      expandedLocal.value = !!g[props.path]
      matchedLocal.value = !!m[props.path]
    }

    function onToggle() {
      // 同步到全局
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('tree-toggle', { detail: { path: props.path } }))
      }
      emit('toggle', props.path)
    }

    onMounted(() => {
      updateFromGlobal()
      window.addEventListener('tree-state-changed', updateFromGlobal)
    })

    return () => {
      const n = props.node as RawGroup
      const children = Array.isArray(n.items) && n.items.length ? n.items : null

      const titleChildren: any[] = []
      if (children) {
        titleChildren.push(h('button', {
          class: 'tree-toggle',
          onClick: (e: Event) => { e.preventDefault(); onToggle() },
          'aria-label': '展开/折叠'
        }, [ h('span', { class: ['chev', expandedLocal.value ? 'open' : ''] }, expandedLocal.value ? '▾' : '▸') ]))
      }

      const textClass = children ? 'tree-link' : 'tree-text'
      const cls = matchedLocal.value ? `${textClass} match` : textClass

      if (n.link) {
        titleChildren.push(h('a', { class: cls, href: n.link }, n.text))
      } else {
        titleChildren.push(h('span', { class: cls }, n.text))
      }

      const title = h('div', { class: 'tree-node-title' }, titleChildren)

      const childNodes = children ? h('ul', { class: 'tree-children', style: { display: expandedLocal.value ? 'block' : 'none' } },
        children.map((c: RawGroup, i: number) =>
          h('li', { key: i }, [ h(TreeNode as any, { node: c, path: `${props.path}/${i}` }) ])
        )
      ) : null

      return h('li', { class: 'tree-node' }, [ title, childNodes ])
    }
  }
})

// 把 TreeNode 作为全局组件名（模板内可用）
if (typeof (module) !== 'undefined') {
  ;(module as any).exports = { default: ({} as any), TreeNode }
}
</script>

<style scoped>
.tree-sidebar { padding: 0.5rem 0; font-size: 0.95rem; }
.tree-root, .tree-children { list-style: none; margin: 0; padding-left: 0.25rem; }
.tree-node { margin: 0.15rem 0; }
.tree-node-title { display:flex; align-items:center; gap:0.5rem; }
.tree-toggle { background: transparent; border: none; cursor: pointer; color: var(--vp-c-text-3); padding: 0 4px; }
.tree-link { color: var(--vp-c-text-1); text-decoration: none; }
.tree-link:hover { color: var(--vp-c-brand-light); }
.tree-text { color: var(--vp-c-text-2); }
.chev { font-size: 0.85rem; display:inline-block; width: 1.2rem; text-align:center; }

/* 匹配高亮样式 */
.match { background-color: rgba(59, 130, 246, 0.08); color: var(--vp-c-brand-light); padding: 0 4px; border-radius: 4px; }
</style>
