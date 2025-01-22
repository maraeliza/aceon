interface PermissionA {
  id: number
  screen: string
  actions: string[]
}
export const initialPermissions: PermissionA[] = [
  { id: 1, screen: 'dashboard', actions: ['read', 'write'] },
  { id: 2, screen: 'my-forms', actions: ['read'] },
  { id: 3, screen: 'responses', actions: ['read', 'delete'] },
  { id: 4, screen: 'automations', actions: ['read', 'write', 'delete'] },
  { id: 5, screen: 'integrations', actions: ['read'] },
  { id: 6, screen: 'entities', actions: ['read', 'write'] },
  { id: 7, screen: 'people', actions: ['read'] },
  { id: 8, screen: 'settings', actions: ['read', 'write'] },
  { id: 9, screen: 'users', actions: ['read', 'delete'] },
  { id: 10, screen: 'groups', actions: ['read', 'write'] },
  { id: 11, screen: 'permissions', actions: ['read', 'write', 'delete'] },
]
