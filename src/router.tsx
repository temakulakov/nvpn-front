import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { HomePage } from './pages/HomePage'
import { AccountPage } from './pages/AccountPage'
import { PricesPage } from './pages/PricesPage'
import { LanguagePage } from './pages/LanguagePage'
import { TelegramProvider } from './providers/TelegramProvider'

const rootRoute = createRootRoute({
  component: () => (
    <TelegramProvider>
      <div style={{ 
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <Outlet />
      </div>
    </TelegramProvider>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: AccountPage,
})

const pricesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/prices',
  component: PricesPage,
})

const languageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/language',
  component: LanguagePage,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  accountRoute,
  pricesRoute,
  languageRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
