import type { IProfile, ProfileSettings } from "./models/admin";
import { get } from "@vueuse/core";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<IProfile | null>(null);
  const adminProfile = ref<IProfile | null>(null);
  const profiles = ref<IProfile[]>([]);
  const isLoading = ref(false);

  const user = useSupabaseUser();
  const session = useSupabaseSession();

  const sessionProfile = session ? session : null;

  const getProfile = async (): Promise<IProfile> => {
    if (profile.value) {
      return profile.value;
    }

    isLoading.value = true;
    try {
      if (get(user) == null) {
        throw createError({
          statusCode: 401,
          message: "Não tem usuário logado",
        });
      }
      const currenntUser = get(user);

      const data = await $fetch<IProfile>(`/api/v1/profile?id=${currenntUser?.id}`, {
        method: "GET",
      });

      profile.value = data;
      return data;
    } catch (error: any) {
      throw createError({
        message: "Erro na busca de conta",
        data: error,
        statusCode: 404,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const getAdminProfile = async (id: string) => {
    try {
      const data = await $fetch<IProfile>(`/api/v1/profile?id=${id}`, {
        method: "get",
      });

      adminProfile.value = data;
      return data;
    } catch (error: any) {
      throw createError({
        message: "Erro na busca por conta Admin",
        data: error,
        statusCode: 404,
      });
    }
  };

  const getAllProfiles = async () => {
    try {
      const data = await $fetch<IProfile[]>(`/api/v1/profile/list`, {
        method: "get",
      });

      profiles.value = data;
      return data;
    } catch (error: any) {
      throw createError({
        message: error.message,
      });
    }
  };

  const updateProfile = async (param: ProfileSettings) => {
    try {
      const data = await $fetch("/api/v1/profile", {
        method: "POST",
        body: param,
      });

      if (data) {
        await getProfile();
      }
    } catch (error) {
      return createError({
        data: error,
        message: "Erro na atualização do usuário",
      });
    }
  };

  const resetState = () => {
    profile.value = null;
    adminProfile.value = null;
    profiles.value = [];
    isLoading.value = false;
  };

  return {
    profile,
    adminProfile,
    profiles,
    isLoading,
    getProfile,
    getAllProfiles,
    getAdminProfile,
    updateProfile,
    resetState,
  };
});
