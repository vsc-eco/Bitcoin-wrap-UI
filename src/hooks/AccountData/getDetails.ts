import { useAuth } from '../auth'
import { useQuery } from '@tanstack/react-query'
import { fetchAccountsStatus } from '../VSC'

export function useDetails() {
  const auth = useAuth()
  //made the function for fetching the details here
  const getInitials = useQuery({
    queryKey: ['account_status', auth.authenticated ? auth.userId : ''],
    queryFn: () =>
      auth.authenticated ? fetchAccountsStatus(auth.userId) : null,
  })
  console.log('get details', getInitials)
  return getInitials.data
}
