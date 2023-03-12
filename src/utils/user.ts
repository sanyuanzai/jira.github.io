import { User } from 'types/User'
import { useHttp } from './http'
import { useQuery } from 'react-query'
export default function useUsers(param?: Partial<User>) {
  const client = useHttp()
  return useQuery<User[]>(['users', param], () =>
    client('users', { data: param })
  )
}
