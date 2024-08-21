import { AuthActions } from '../../hooks/auth'
import { HIVE_PREFIX } from '../../hooks/auth/hive'
import { ETH_PREFIX } from '../../hooks/auth/wagmi-web3modal'

export function readableUsername(userId: string): string {
  let username: string | undefined
  if (userId.startsWith(ETH_PREFIX)) {
    const address = userId.slice(ETH_PREFIX.length)
    username = `${address.slice(0, 6)}...${address.slice(address.length - 5)}`
  }

  if (userId.startsWith(HIVE_PREFIX)) {
    username = userId.slice(HIVE_PREFIX.length)
  }

  if (!username) {
    return userId
  }
  return username
}

export function UserInfo({ userId }: { userId: string }) {
  const username = readableUsername(userId)

  return <div onClick={() => AuthActions.logout()}>{username}</div>
}
