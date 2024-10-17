export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    localStorage.setItem('redirectTo', to.fullPath);
  }

})