import { type DirectiveBinding } from 'vue'

export default {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    const type = binding.value

    const patterns: Record<string, RegExp> = {
      letters: /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
      numbers: /[^0-9]/g,
      email: /[^A-Za-z0-9@._-]/g,
      alphanumeric: /[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]/g,
    }

    const sanitize = (event: Event) => {
      const el = event.target as HTMLInputElement
      if (!el?.value) return

      const regex = patterns[type] || /[]/g
      el.value = el.value.replace(regex, '')
      el.dispatchEvent(new Event('input'))
    }

    const handleKeypress = (e: KeyboardEvent) => {
      const char = String.fromCharCode(e.keyCode)
      let allow = true

      switch (type) {
        case 'letters':
          allow = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(char)
          break
        case 'numbers':
          allow = /^[0-9]$/.test(char)
          break
        case 'email':
          allow = /^[A-Za-z0-9@._-]$/.test(char)
          break
        case 'alphanumeric':
          allow = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]$/.test(char)
          break
      }

      if (!allow) e.preventDefault()
    }

    el.addEventListener('keypress', handleKeypress)
    el.addEventListener('input', sanitize)
  },
}
