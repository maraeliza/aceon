import { HeadCell } from '@/utils/interfaces'

export const rows = [
  {
    id: 1,
    name: 'Formulário de Cadastro',
    status: 'Ativo',
    dtLastUpdate: '15-12-2024 14:25',
    lastUpdatedBy: 'Pedro Souza', // Adicionando a última pessoa que atualizou
    dtCreate: '12-12-2024 09:30', // Adicionando a data de criação
    responses: 150,
    creator: 'João Silva',
  },
  {
    id: 2,
    name: 'Formulário de Feedback',
    status: 'Inativo',
    dtLastUpdate: '20-12-2024 11:40',
    lastUpdatedBy: 'Mariana Costa', // Adicionando a última pessoa que atualizou
    dtCreate: '15-12-2024 08:20', // Adicionando a data de criação
    responses: 85,
    creator: 'Maria Oliveira',
  },
  {
    id: 3,
    name: 'Formulário de Pesquisa de Satisfação',
    status: 'Ativo',
    dtLastUpdate: '25-12-2024 16:50',
    lastUpdatedBy: 'Carlos Pereira', // Adicionando a última pessoa que atualizou
    dtCreate: '18-12-2024 13:15', // Adicionando a data de criação
    responses: 210,
    creator: 'Carlos Santos',
  },
  {
    id: 4,
    name: 'Formulário de Inscrição',
    status: 'Ativo',
    dtLastUpdate: '30-12-2024 10:05',
    lastUpdatedBy: 'Ana Costa', // Adicionando a última pessoa que atualizou
    dtCreate: '22-12-2024 17:45', // Adicionando a data de criação
    responses: 75,
    creator: 'Ana Costa',
  },
  {
    id: 5,
    name: 'Formulário de Acompanhamento',
    status: 'Inativo',
    dtLastUpdate: '05-01-2025 09:50',
    lastUpdatedBy: 'Ricardo Lima', // Adicionando a última pessoa que atualizou
    dtCreate: '27-12-2024 12:30', // Adicionando a data de criação
    responses: 50,
    creator: 'Ricardo Lima',
  },
]

export const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'id',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'responses',
    numeric: true,
    disablePadding: false,
    label: 'Número de respostas',
  },
  {
    id: 'dtCreate',
    numeric: true,
    disablePadding: false,
    label: 'Data de criação',
  },
  {
    id: 'dtLastUpdate',
    numeric: true,
    disablePadding: false,
    label: 'Data da Última atualização',
  },
]
