import { Group } from '@/utils/interfaces'

export const initialGroups: Group[] = [
  {
    id: 1,
    name: 'Admin',
    createdBy: 'Alice',
    lastModifiedBy: 'Bob',
    createdAt: '2025-01-01',
    lastModifiedAt: '2025-01-05',
    users: ['Alice', 'Bob'],
    permissions: ['Read', 'Write', 'Execute'],
    description: '',
  },
  {
    id: 2,
    name: 'Editor',
    createdBy: 'Charlie',
    lastModifiedBy: 'Alice',
    createdAt: '2025-01-02',
    lastModifiedAt: '2025-01-04',
    users: ['Charlie'],
    permissions: ['Read', 'Write'],
    description: '',
  },
]
