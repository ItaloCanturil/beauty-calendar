export default defineNuxtRouteMiddleware((to, from) => {
  if(process.client) {
    localStorage.setItem('authRoute', to.path);
  }
})