interface User {
  id: number
  name: string
  cpf: string
  number: string
  cnpj: string
  address: string
}

export const initialUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    number: '1234567890',
    cnpj: '12.345.678/0001-00',
    address: 'Rua A, 123',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    cpf: '234.567.890-11',
    number: '2345678901',
    cnpj: '23.456.789/0001-01',
    address: 'Avenida B, 456',
  },
  {
    id: 3,
    name: 'Carlos Pereira',
    cpf: '345.678.901-22',
    number: '3456789012',
    cnpj: '34.567.890/0001-02',
    address: 'Rua C, 789',
  },
  {
    id: 4,
    name: 'Ana Costa',
    cpf: '456.789.012-33',
    number: '4567890123',
    cnpj: '45.678.901/0001-03',
    address: 'Praça D, 101',
  },
  {
    id: 5,
    name: 'Lucas Santos',
    cpf: '567.890.123-44',
    number: '5678901234',
    cnpj: '56.789.012/0001-04',
    address: 'Rua E, 202',
  },
  {
    id: 6,
    name: 'Patrícia Lima',
    cpf: '678.901.234-55',
    number: '6789012345',
    cnpj: '67.890.123/0001-05',
    address: 'Avenida F, 303',
  },
  {
    id: 7,
    name: 'Felipe Almeida',
    cpf: '789.012.345-66',
    number: '7890123456',
    cnpj: '78.901.234/0001-06',
    address: 'Rua G, 404',
  },
  {
    id: 8,
    name: 'Juliana Rocha',
    cpf: '890.123.456-77',
    number: '8901234567',
    cnpj: '89.012.345/0001-07',
    address: 'Praça H, 505',
  },
  {
    id: 9,
    name: 'Ricardo Martins',
    cpf: '901.234.567-88',
    number: '9012345678',
    cnpj: '90.123.456/0001-08',
    address: 'Rua I, 606',
  },
  {
    id: 10,
    name: 'Fernanda Souza',
    cpf: '012.345.678-99',
    number: '0123456789',
    cnpj: '01.234.567/0001-09',
    address: 'Avenida J, 707',
  },
]
