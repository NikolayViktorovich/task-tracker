export const createSimpleRouter = () => {
  let currentRoute = 'login'
  const listeners = []

  const routes = {
    '/': 'home',
    '/login': 'login', 
    '/profile': 'profile',
    '/oauth-callback': 'login'
  }

  const getCurrentRoute = () => {
    const path = window.location.pathname
    return routes[path] || 'login'
  }

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    currentRoute = getCurrentRoute()
    listeners.forEach(listener => listener(currentRoute, path))
  }

  const onRouteChange = (listener) => {
    listeners.push(listener)
  }

  window.addEventListener('popstate', () => {
    currentRoute = getCurrentRoute()
    listeners.forEach(listener => listener(currentRoute, window.location.pathname))
  })

  currentRoute = getCurrentRoute()

  return { 
    navigate, 
    onRouteChange, 
    getCurrentRoute,
    getCurrentPath: () => window.location.pathname
  }
}

export const router = createSimpleRouter()