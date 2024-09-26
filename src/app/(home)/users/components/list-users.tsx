'use client'
import { getUsers } from '@/app/http/get-users'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { EllipsisVertical } from 'lucide-react'
import { DeleteUser } from './delete-user'
import { UpdateUser } from './update-user'

export function ListUsers() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['list-users'],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao buscar dados</p>
  if (!users) return null

  return (
    <Table className="border border-collapse rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="border">Nome</TableHead>
          <TableHead className="border">E-mail</TableHead>
          <TableHead className="border">Tipo de Usuário</TableHead>
          <TableHead className="border">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow
              key={user.id}
              className="odd:bg-white odd:dark:bg-slate-950 even:bg-slate-50 even:dark:bg-slate-900"
            >
              <TableCell className="border">{user.name}</TableCell>
              <TableCell className="border">{user.email}</TableCell>
              <TableCell className="border">{user.userRole}</TableCell>
              <TableCell className="text-center w-4 border ">
                <Popover>
                  <PopoverTrigger className="h-4">
                    <EllipsisVertical size={18} />
                  </PopoverTrigger>
                  <PopoverContent className="space-y-2 w-30 mr-9">
                    <UpdateUser
                      id={user.id}
                      email={user.email}
                      name={user.name}
                      password={user.password}
                      userRole={user.userRole}
                    />
                    <DeleteUser userId={user.id} />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
