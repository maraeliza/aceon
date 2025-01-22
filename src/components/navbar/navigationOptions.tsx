import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import GroupWorkIcon from '@mui/icons-material/GroupWork'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InboxIcon from '@mui/icons-material/Inbox'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import Groups3Icon from '@mui/icons-material/Groups3'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import FlagIcon from '@mui/icons-material/Flag';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Navigation } from '@toolpad/core/AppProvider'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
const ImageLogo = () => {
  return (
    <img
      src="https://i.postimg.cc/Y0mwTqpG/logo.png"
      alt="Logo Aceon"
      width={40}
      height={40}
    />
  )
}
export const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Home',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Formulários',
  },
  {
    segment: 'forms',
    title: 'Formulários',
    icon: <DescriptionIcon />,
    children: [
      {
        segment: 'my-forms',
        title: 'Meus Formulários',
        icon: <DocumentScannerIcon />,
      },
      {
        segment: 'responses',
        title: 'Respostas',
        icon: <InboxIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Automação e Integrações',
  },
  {
    segment: 'automations',
    title: 'Automações (n8n)',
    icon: <AutorenewIcon />,
  },
  {
    segment: 'integrations',
    title: 'Integrações',
    icon: <LayersIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Gestão de Entidades',
  },
  {
    segment: 'entities',
    title: 'Entidades',
    icon: <GroupWorkIcon />,
  },
  {
    segment: 'people',
    title: 'Pessoas',
    icon: <PeopleIcon />,
  },

  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Configurações',
  },
  {
    segment: 'users',
    title: 'Usuários',
    icon: <ManageAccountsIcon />,
  },
  {
    segment: 'groups',
    title: 'Grupos',
    icon: <Groups3Icon />,
  },
  {
    segment: 'roles',
    title: 'Papéis',
    icon: <SensorOccupiedIcon />,
  },
  {
    segment: 'tenants',
    title: 'Empresas',
    icon: <CorporateFareIcon />,
  },
  {
    segment: 'plans',
    title: 'Planos',
    icon: <WorkspacePremiumIcon />,
  },
  {
    segment: 'countries',
    title: 'Países',
    icon: <FlagIcon />,
  },
  {
    segment: 'permissions',
    title: 'Permissões',
    icon: <LockPersonIcon />,
  },

  {
    segment: 'settings',
    title: 'Configurações Gerais',
    icon: <SettingsIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Ajuda e Suporte',
  },
  {
    segment: 'knowledge-base',
    title: 'Base de Conhecimento',
    icon: <LibraryBooksIcon />,
  },
  {
    segment: 'faq',
    title: 'FAQ',
    icon: <HelpOutlineIcon />,
  },
  {
    segment: 'support',
    title: 'Suporte',
    icon: <SupportAgentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Minha Conta',
  },
  {
    segment: 'profile',
    title: 'Meu Perfil',
    icon: <AccountCircleIcon />,
  },
]

export const branding = {
  title: 'Aceon',
  logo: <ImageLogo />,
  homeUrl: '/',
}
