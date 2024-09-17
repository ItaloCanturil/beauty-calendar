export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSupabaseSession();

  if (process.client) {
    localStorage.setItem('authRoute', to.path);
  }

})