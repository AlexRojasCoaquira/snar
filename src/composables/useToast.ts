import { toast } from 'vue3-toastify'
export function useToast() {
  return {
    successToast: (msg: string) => toast.success(msg),
    errorToast: (msg: string) => toast.error(msg),
    infoToast: (msg: string) => toast.info(msg),
    warningToast: (msg: string) => toast.warning(msg),
  }
}
