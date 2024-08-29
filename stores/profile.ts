export const useProfileStore = defineStore('profile', () => {
  const user = useSupabaseUser();
  const profile = ref();
  
  const getProfile = async (id: string) => {
    try {
      const data = await $fetch(`/api/v1/profile?id=${id}`, {
        method: 'get',
      })

      return data
    } catch (error: any) {
      createError({
        message: error.message
      })
    }
  }

  return {
    profile,
    getProfile
  }
})