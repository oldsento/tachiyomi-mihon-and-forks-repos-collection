<script setup lang="ts">
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TreeSidebar from './components/TreeSidebar.vue'
import './style.css'

const { theme } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <!-- Top search input (opens built-in search if available + performs client-side filter) -->
      <div class="top-search-wrapper">
        <input
          id="top-search"
          class="top-search-input"
          type="search"
          placeholder="搜索文档或目录 (按 Enter 搜索)..."
          @keydown.enter.prevent="onEnter"
          @input="onInput"
        />
        <button class="top-search-open" @click="openBuiltInSearch" aria-label="打开搜索">🔎</button>
      </div>
    </template>

    <template #sidebar-nav-after>
      <!-- Tree sidebar inserted below default sidebar nav -->
      <div class="tree-sidebar-container">
        <TreeSidebar :sidebar="theme.value?.sidebar ?? {}" />
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<script lang="ts">
// Client-side behavior for the top search input
const inputEl = typeof document !== 'undefined' ? document.getElementById('top-search') as HTMLInputElement | null : null

function openBuiltInSearch() {
  if (typeof window === 'undefined') return
  // Try to find VitePress default search button and click it
  const btn = document.querySelector('.VPNavBar .VPNavBarSearch, .VPNavBarSearch, button[aria-label="Search"]') as HTMLElement | null
  if (btn) {
    btn.click()
    // If theres an input inside the modal, focus and set value
    setTimeout(() => {
      const modalInput = document.querySelector('.VPSearchBox input, input[type="search"]') as HTMLInputElement | null
      if (modalInput && inputEl) modalInput.value = inputEl.value
      modalInput?.focus()
    }, 50)
    return
  }

  // Fallback: focus the top input
  inputEl?.focus()
}

function onEnter(e: KeyboardEvent) {
  // try built-in search open
  openBuiltInSearch()
}

function onInput(e: Event) {
  // Dispatch a custom event so TreeSidebar can listen and filter
  const input = e.target as HTMLInputElement
  window.dispatchEvent(new CustomEvent('top-search-input', { detail: { query: input.value } }))
}
</script>
