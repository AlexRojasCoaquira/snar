// export default {
//   mounted(el: HTMLInputElement) {
//     const sanitize = (event: Event) => {
//       const el = event.target as HTMLInputElement
//       if (!el?.value) return

//       el.value = el.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '')
//       el.dispatchEvent(new Event('input'))
//     }

//     const handleKeypress = (e: KeyboardEvent) => {
//       const char = String.fromCharCode(e.keyCode)
//       if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(char)) e.preventDefault()
//     }

//     el.addEventListener('keypress', handleKeypress)
//     el.addEventListener('input', sanitize)
//   },
// }
