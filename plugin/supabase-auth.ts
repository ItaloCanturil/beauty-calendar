import { useSupabaseClient } from "#imports";

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const userRole = localStorage.getItem('userRole');

      const user = session?.user;

      const {error} = await supabase
        .from('profiles')
        .update({ userRole })
        .eq('id', user?.id)
      
      if (error) {
        createError({
          message: error.message
        })
      }

      localStorage.removeItem('userRole');
    }
  })
})