import React from 'react'
import { useRouter } from 'next/router'
import { PageMyForms } from '@/pages/my-forms'
import { PageDashboard } from '@/pages/dashboard'
import { PageSettings } from '@/pages/settings'
import { PageUsers } from '@/pages/users'
import AnalysisScreen from '@/pages/my-forms-analysis'
import PageGroups from '@/pages/groups'
import PagePermissions from '@/pages/permissions'
import KnowledgeBasePage from '@/pages/knowlege-base'
import FaqPage from '@/pages/faq'
import ContactSupportPage from '@/pages/support'
import ProfilePage from '@/pages/my-profile'
import AutomationPage from '@/pages/automations'
import PageIntegrations from '@/pages/integrations'
import PageEntities from '@/pages/entities'
import PagePeople from '@/pages/people'
import { Router } from '@toolpad/core/AppProvider'
import PageRoles from '@/pages/roles'
import { PageTenants } from '@/pages/tenants'
import { PagePlans } from '@/pages/plans'
import { PageCountries } from '@/pages/countries'

export function useDemoRouter(initialPath: string) {
  const [pathname, setPathname] = React.useState(initialPath)
  const router = useRouter()

  React.useEffect(() => {
    setPathname(router.pathname) // Update pathname with the current router pathname
  }, [router.pathname])

  // Create a searchParams (URLSearchParams) instance
  const searchParams = React.useMemo(() => {
    const params = new URLSearchParams()

    // Iterate over router.query (ParsedUrlQuery) to fill the searchParams object
    Object.entries(router.query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If the query parameter has multiple values, use the first one
        params.set(key, value[0])
      } else if (typeof value === 'string') {
        // If it's a string, directly set it
        params.set(key, value)
      }
    })

    return params
  }, [router.query])

  // Define the custom router object to match the Router interface
  const customRouter: Router = React.useMemo(
    () => ({
      pathname,
      searchParams, // The URLSearchParams object
      navigate: (path: string | URL) => {
        router.push(path) // Navigate using Next.js router
        setPathname(String(path)) // Update local pathname state
      },
    }),
    [pathname, searchParams, router],
  )

  return customRouter
}

export default function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case '/dashboard':
      return <PageDashboard />
    case '/settings':
      return <PageSettings />
    case '/users':
      return <PageUsers />
    case '/forms/my-forms':
      return <PageMyForms />
    case '/forms/responses':
      return <AnalysisScreen />
    case '/automations':
      return <AutomationPage />
    case '/integrations':
      return <PageIntegrations />
    case '/entities':
      return <PageEntities />
    case '/people':
      return <PagePeople />
    case '/groups':
      return <PageGroups />
    case '/countries':
      return <PageCountries />
    case '/plans':
      return <PagePlans />
    case '/roles':
      return <PageRoles />
    case '/tenants':
      return <PageTenants />
    case '/permissions':
      return <PagePermissions />
    case '/knowledge-base':
      return <KnowledgeBasePage />
    case '/faq':
      return <FaqPage />
    case '/support':
      return <ContactSupportPage />
    case '/profile':
      return <ProfilePage />
    default:
      return <div />
  }
}
