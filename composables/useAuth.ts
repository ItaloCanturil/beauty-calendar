export const useAuth = () => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const isLogged = computed(() => user.value !== null);


  const loginWithProvider =  async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/admin',
        queryParams: {
          client: 'admin',
        },
        scopes: 'https://www.googleapis.com/auth/calendar.events'
      }
    })

    if(error){
      throw createError({
        message: error.message
      })
    }
  }

  const logout = async () => {
    console.log('rtes')
    try {
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