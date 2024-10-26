export const useAuth = () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const isLogged = computed(() => user.value !== null);

  const runtimeConfig = useRuntimeConfig();

  const getURL = () => {
    const redirectLocal = localStorage.getItem('redirectTo');

    let url =
      runtimeConfig.urlSite 
      ? `${runtimeConfig.urlSite}${{redirectLocal}}`
      : `http://localhost:3000${redirectLocal ?? '/'}`;

    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    // url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  const loginWithProvider =  async () => {
    try {
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getURL(),
          scopes: 'https://www.googleapis.com/auth/calendar.events',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      })
  
      if(error){
        throw createError({
          message: error.message
        })
      }
    } catch (err: any) {
      throw createError({
        message: err.message
      })
    }
  }

  const logout = async () => {
    try {
      localStorage.clear();
      let { error } = await client.auth.signOut();
  
      if (error) {
        throw error;
      }
  
    } catch (e: any) {
      createError({
        statusText: e.code
      })
    }
  }

  return {
    isLogged,
    loginWithProvider,
    logout
  }
}