import type { IProfile } from "./models/admin";
import { useStorage } from "@vueuse/core";

export const useProfileStore = defineStore('profile', () => {
  
  const profile = ref<IProfile>();
  const profiles = ref<IProfile[]>();
  
  const session = useSupabaseSession();
  
  const handleTokens = () => {
    if (session) {
      return useStorage('session_token', session.value)
    }
  }
  const sessionProfile = handleTokens();

  const getProfile = async (id: string) => {
    try {
      const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
        method: 'get',
      })

      profile.value = data

      return data
    } catch (error: any) {
      createError({
        message: error.message
      })
    }
  };

  const getAllProfiles = async () => {
    try {
      const data = await $fetch<IProfile[]>(`/api/v1/profile/list`, {
        method: 'get',
      })

      profiles.value = data

      return data
    } catch (error: any) {
      createError({
        message: error.message
      })
    }
  }

  return {
    profile,
    profiles,
    getProfile,
    getAllProfiles,
    sessionProfile
  }
})