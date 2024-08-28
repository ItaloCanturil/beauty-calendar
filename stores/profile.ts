export const useProfileStore = defineStore('profile', () => {
  const user = useSupabaseUser();
  const profile = ref();
  if (user.value) {
    profile.value = user.value
  }

  return {
    profile
  }
})