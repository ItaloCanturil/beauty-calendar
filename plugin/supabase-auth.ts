import { useSupabaseClient } from "#imports";

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient();

  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("🚀 ~ supabase.auth.onAuthStateChange ~ event:", event)
    if (event === 'SIGNED_IN' && session) {
      const authRoute = localStorage.getItem('authRoute');
      const role = authRoute === '/admin' ? 'admin' : 'client';

      const user = session?.user;

      const {error} = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', user?.id)
      
      if (error) {
        createError({
          message: error.message
        })
      }

      localStorage.removeItem('authRoute');
    }
  })
})