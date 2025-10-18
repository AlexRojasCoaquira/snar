export default {
  mounted(el: HTMLInputElement) {
    const sanitize = (event: Event) => {
      const el = event.target as HTMLInputElement
      if (!el?.value) return

      el.value = el.value.replace(/[^0-9]/g, '')
      el.dispatchEvent(new Event('input'))
    }

    const handleKeypress = (e: KeyboardEvent) => {
      const char = String.fromCharCode(e.keyCode)

      if (!/^[0-9]$/.test(char)) e.preventDefault()
    }

    el.addEventListener('keypress', handleKeypress)
    el.addEventListener('input', sanitize)
  },
}
