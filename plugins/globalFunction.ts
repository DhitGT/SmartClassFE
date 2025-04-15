export default defineNuxtPlugin((nuxtApp) => {
    const checkRole = (granted: string[]) => {
      if (process.client) {
        const userData = localStorage.getItem('user')
        if (!userData) return false

        try {
          const user = JSON.parse(userData)
          return granted.includes(user.role)
        } catch (error) {
          console.error('Invalid user data in localStorage:', error)
          return false
        }
      }
  
      return false
    }
  
    nuxtApp.provide('checkRole', checkRole)
  })
  