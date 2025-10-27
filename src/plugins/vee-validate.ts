import { configure } from 'vee-validate'

export function setupVeeValidate() {
  configure({
    validateOnBlur: true, // al salir del campo
    validateOnChange: true, // al cambiar el valor
    validateOnInput: true, // mientras escribes
    validateOnModelUpdate: true, // cuando se actualiza el v-model
  })
}
