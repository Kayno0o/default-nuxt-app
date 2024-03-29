export type RoleType = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_DOFUS_VIEWER' | 'ROLE_DOFUS_EDITOR'

export const RoleHierarchy: { [key in RoleType]: Array<RoleType> } = {
  ROLE_USER: [],
  ROLE_DOFUS_VIEWER: ['ROLE_USER'],
  ROLE_DOFUS_EDITOR: ['ROLE_DOFUS_VIEWER'],
  ROLE_ADMIN: ['ROLE_USER', 'ROLE_DOFUS_EDITOR'],
  ROLE_SUPER_ADMIN: ['ROLE_ADMIN'],
}

export function useIsGranted(role: RoleType): boolean {
  const { user } = useUserSession()

  if (!user.value)
    return false

  if (user.value.roles.includes(role))
    return true

  const roles = RoleHierarchy

  function getIsParent(role: RoleType): boolean {
    if (!user.value)
      return false

    const parents = Object.entries(roles)

    for (let i = 0; i < parents.length; i++) {
      const [parent, children] = parents[i]

      if (children.includes(role)) {
        if (user.value.roles.includes(parent as RoleType))
          return true

        if (getIsParent(parent as RoleType))
          return true
      }
    }

    return false
  }

  return getIsParent(role)
}
