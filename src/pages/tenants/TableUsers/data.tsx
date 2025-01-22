export interface Empresa {
  id: number;
  name: string;
  phone: string;
  cnpj: string;
  address: string;
}

export const dataCompany: Empresa[] = [
  {
    id: 1,
    name: 'Tech Solutions Ltda',
    phone: '1234567890',
    cnpj: '12.345.678/0001-00',
    address: 'Rua A, 123',
  },
  {
    id: 2,
    name: 'Green Energy S/A',
    phone: '2345678901',
    cnpj: '23.456.789/0001-01',
    address: 'Avenida B, 456',
  },
  {
    id: 3,
    name: 'Pereira & Associados',
    phone: '3456789012',
    cnpj: '34.567.890/0001-02',
    address: 'Rua C, 789',
  },
  {
    id: 4,
    name: 'Costa Comércio',
    phone: '4567890123',
    cnpj: '45.678.901/0001-03',
    address: 'Praça D, 101',
  },
  {
    id: 5,
    name: 'Santos Indústria',
    phone: '5678901234',
    cnpj: '56.789.012/0001-04',
    address: 'Rua E, 202',
  },
  {
    id: 6,
    name: 'Lima Consultoria',
    phone: '6789012345',
    cnpj: '67.890.123/0001-05',
    address: 'Avenida F, 303',
  },
  {
    id: 7,
    name: 'Almeida Tecnologia',
    phone: '7890123456',
    cnpj: '78.901.234/0001-06',
    address: 'Rua G, 404',
  },
  {
    id: 8,
    name: 'Rocha e Rocha Advogados',
    phone: '8901234567',
    cnpj: '89.012.345/0001-07',
    address: 'Praça H, 505',
  },
  {
    id: 9,
    name: 'Martins Comércio',
    phone: '9012345678',
    cnpj: '90.123.456/0001-08',
    address: 'Rua I, 606',
  },
  {
    id: 10,
    name: 'Souza e Souza Ltda',
    phone: '0123456789',
    cnpj: '01.234.567/0001-09',
    address: 'Avenida J, 707',
  },
];

