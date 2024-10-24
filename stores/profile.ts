import type { IProfile } from "./models/admin";
import { useStorage } from "@vueuse/core";

export const useProfileStore = defineStore('profile', () => {
  
  const profile = ref<IProfile>();
  const adminProfile = ref<IProfile>();
  const profiles = ref<IProfile[]>();
  
  const session = useSupabaseSession();
  
  const handleTokens = () => {
    if (session) {
      return useStorage('session_token', session.value)
    }

    return session
  }
  console.log("🚀 ~ handleTokens ~ handleTokens:", handleTokens().value)
  const sessionProfile = handleTokens().value;

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

  const getAdminProfile = async (id: string) => {
    try {
      const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
        method: 'get',
      })

      adminProfile.value = data

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
    adminProfile,
    getProfile,
    getAllProfiles,
    getAdminProfile,
    sessionProfile
  }
})