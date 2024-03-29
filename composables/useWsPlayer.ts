import { randomString } from '~/utils/textUtils'

export default function useWsPlayer() {
  return useCookie('user', {
    default: () => ({
      token: randomString(40, true),
      id: randomString(20, true),
      username: '',
      color: '#ffffff',
    }),
  })
}
