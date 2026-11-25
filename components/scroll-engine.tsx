'use client'

import { useEffect } from 'react'

type ScrollCraftInstance = {
  destroy: () => void
}

type ScrollCraftGlobal = {
  mount: (root: HTMLElement, opts?: Record<string, unknown>) => ScrollCraftInstance
}

declare global {
  interface Window {
    ScrollCraft?: ScrollCraftGlobal
  }
}

/**
 * Loads the scroll-craft runtime once and mounts it against the document body.
 * The runtime is deliberately kept outside React so the authored document stays
 * the source of truth for acts, cues, and pin lengths.
 */
export function ScrollEngine() {
  useEffect(() => {
    let instance: ScrollCraftInstance | undefined
    let cancelled = false
    let script: HTMLScriptElement | null = null

    const boot = () => {
      if (cancelled || !window.ScrollCraft) return
      instance = window.ScrollCraft.mount(document.body)
    }

    if (window.ScrollCraft) {
      boot()
    } else {
      script = document.createElement('script')
      script.src = '/scrollcraft.js'
      script.async = true
      script.addEventListener('load', boot)
      document.body.appendChild(script)
    }

    return () => {
      cancelled = true
      instance?.destroy()
      if (script) {
        script.removeEventListener('load', boot)
        script.remove()
      }
    }
  }, [])

  return null
}
