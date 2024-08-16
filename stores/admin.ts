import type { IDate } from "./models/admin"

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      dateAvailable: [] as IDate[]
    }
  },
  actions: {
    
  }
})