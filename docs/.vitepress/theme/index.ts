import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CustomLayout from './Layout.vue'
import './style.css'

export default {
  ...DefaultTheme,
  Layout: CustomLayout
} as Theme
