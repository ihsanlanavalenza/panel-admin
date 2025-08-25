// Simple inline SVG icon components (outline style) to replace emoji.
// Usage: <IconDashboard class="sb-icon" /> etc.
import { h } from 'vue'

function svg(props: any, children: any) {
  return h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 1.6, ...props }, children)
}

export const IconDashboard = (props: any) => svg(props, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z' })
])

export const IconUsers = (props: any) => svg(props, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM7 13c-3.314 0-6 2.239-6 5v2h12v-2c0-2.761-2.686-5-6-5Zm10 0c-.695 0-1.36.1-1.978.284A5.486 5.486 0 0 1 20 18v2h4v-2c0-2.761-2.686-5-6-5Z' })
])

export const IconReports = (props: any) => svg(props, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4 4h9l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm9 0v5h5M8 13h2m-2 4h6m-6-8h2' })
])

export const IconSettings = (props: any) => svg(props, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6c.31 0 .6-.09.85-.24A1.65 1.65 0 0 0 11 2.85V2a2 2 0 1 1 4 0v.09c0 .43.17.83.45 1.13.25.16.54.24.85.24.69 0 1.3.28 1.76.74l.06.06a2 2 0 1 1 2.83 2.83l-.06.06c-.46.46-.74 1.07-.74 1.76 0 .31-.09.6-.24.85.28.3.45.7.45 1.13V12c0 .43-.17.83-.45 1.13.16.25.24.54.24.85Z' })
])

export const IconAlerts = (props: any) => svg(props, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 17h-2m1-11c-3.314 0-6 2.239-6 5v3l-2 3h16l-2-3v-3c0-2.761-2.686-5-6-5Zm0 14a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3Z' })
])
