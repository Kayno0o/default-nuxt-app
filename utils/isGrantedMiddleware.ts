import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { RoleType } from '~/types/entity'

export default function isGrantedMiddleware(roles: RoleType[], redirect = '/', condition: 'some' | 'every' = 'some'): NavigationGuard {
  return (_to: RouteLocationNormalized, _from: RouteLocationNormalized, _next: NavigationGuardNext) => {
    const isGranted = condition === 'some'
      ? roles.some(role => useIsGranted(role))
      : roles.every(role => useIsGranted(role))

    if (!isGranted)
      return redirect

    return true
  }
}
