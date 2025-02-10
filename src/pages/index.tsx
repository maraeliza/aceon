import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import { AppProvider, Branding, type Router } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { NAVIGATION } from '@/components/navbar/navigationOptions'
import PageContent from '@/configs/configRoute'
import PageLogin from './login'
import PageRegister from './register/page'
import { Image } from '@mui/icons-material'
import { ptBR } from '@mui/material/locale'

const demoTheme = createTheme(
  {
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  },
  ptBR,
)

interface DemoProps {
  window?: () => Window
}
const branding: Branding = {
  title: 'Aceon',
  logo: <img src={'https://i.postimg.cc/Y0mwTqpG/logo.png'} />,
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const [pathname, setPathname] = React.useState('/tenants')
  const { window } = props
  const demoWindow = window !== undefined ? window() : undefined

  const router: Router = {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={branding}
    >
      {/*
      {pathname === '/login' ? (
        <PageLogin setPathname={setPathname} router={router} />
      ) : pathname === '/register' ? (
        <PageRegister setPathname={setPathname} router={router} />
      ) : (
       */}
      <DashboardLayout>
        <PageContent pathname={pathname} />
      </DashboardLayout>
      {
        //)}
      }
    </AppProvider>
  )
}
