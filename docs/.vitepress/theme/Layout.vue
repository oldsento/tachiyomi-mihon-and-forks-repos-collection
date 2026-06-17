<script setup lang="ts">
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TreeSidebar from './components/TreeSidebar.vue'
import './style.css'

const { theme } = useData()

function openBuiltInSearch() {
  if (typeof window === 'undefined') return
  const btn = document.querySelector('.VPNavBar .VPNavBarSearch, .VPNavBarSearch, button[aria-label="Search"]') as HTMLElement | null
  if (btn) {
    btn.click()
    setTimeout(() => {
      const modalInput = document.querySelector('.VPSearchBox input, input[type="search"]') as HTMLInputElement | null
      const topInput = document.getElementById('top-search') as HTMLInputElement | null
      if (modalInput && topInput) modalInput.value = topInput.value
      modalInput?.focus()
    }, 50)
    return
  }
  const top = document.getElementById('top-search') as HTMLInputElement | null
  top?.focus()
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  // expose for node highlight rendering
  ;(window as any).__TOP_SEARCH_QUERY = input.value
  window.dispatchEvent(new CustomEvent('top-search-input', { detail: { query: input.value } }))
}
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <div class="top-search-wrapper" role="search" aria-label="站点搜索">
        <input id="top-search" class="top-search-input" type="search"
               placeholder="搜索文档或目录 (按 Enter 打开高级搜索)..."
               @keydown.enter.prevent="openBuiltInSearch"
               @input="onInput" />
        <button class="top-search-open" @click="openBuiltInSearch" aria-label="打开搜索">🔎</button>
      </div>
    </template>

    <template #sidebar-nav-after>
      <div class="tree-sidebar-container">
        <TreeSidebar :sidebar="theme.value?.sidebar ?? {}" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
