'use client'
import { updateUser } from '@/app/http/update-user'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User } from '@/types/user'
import { userRoles } from '@/utils/user-roles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NotebookPen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const updateUserSchema = z
  .object({
    name: z.string().min(3, {
      message: 'O nome de usuário precisa ser maior que 03 caracteres.',
    }),
    email: z
      .string()
      .min(3, { message: 'O e-mail precisa ser maior que 03 caracteres!' })
      .email({ message: 'Digite um e-mail válido.' })
      .toLowerCase(),
    confirm_email: z.string(),
    password: z
      .string()
      .min(8, { message: 'A senha precisa ter no mínimo 8 caracteres.' })
      .max(20),
    confirm_password: z.string(),

    userRole: z.enum(['Administrador', 'Nível 1', 'Nível 2'], {
      message:
        'Nível de usuário inválido, Escolha entre Administrador, Nível 1, Nível 2',
    }),
  })
  .superRefine((value, ctx) => {
    if (value.confirm_password !== value.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'As senhas não coincidem.',
      })
    }
    if (value.email !== value.confirm_email) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_email'],
        message: 'Os e-mails não coincidem.',
      })
    }
  })

type UpdateUserForm = z.infer<typeof updateUserSchema>

export function UpdateUser({ id, email, name, password, userRole }: User) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name,
      email,
      confirm_email: email,
      password,
      confirm_password: password,
      userRole,
    },
  })

  const queryClient = useQueryClient()
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-users'] })
      setIsOpen(false)
    },
    onError: (error) => {
      console.log('error' + error)
    },
  })

  function handleUpdateUser(data: UpdateUserForm) {
    updateUserMutation.mutateAsync({
      userId: id,
      email: data.email,
      name: data.name,
      password: data.password,
      userRole: data.userRole,
    })
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogDescription className="sr-only">
        Modal de edição de usuário
      </DialogDescription>
      <DialogTrigger className="flex gap-2 text-muted-foreground font-normal items-center justify-center hover:text-foreground">
        <NotebookPen size={19} />
        Editar
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Editar Informações</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="w-full gap-2 grid grid-cols-2"
        >
          <div className="space-y-2 ">
            <Label htmlFor="name">Seu Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome..."
              {...register('name')}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail..."
              {...register('email')}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="confirm_email">Confirme seu e-mail</Label>
            <Input
              id="confirm_email"
              type="email"
              placeholder="Confirme seu e-mail..."
              autoComplete="off"
              {...register('confirm_email')}
            />
            {errors.confirm_email?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.confirm_email?.message}
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="password">Sua senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha..."
              {...register('password')}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="confirm_password">Confirme sua senha</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="Confirme sua senha..."
              autoComplete="off"
              {...register('confirm_password')}
            />
            {errors.confirm_password?.message && (
              <p className="text-red-500 text-sm font-light">
                {errors.confirm_password?.message}
              </p>
            )}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="userRole">Tipo de Usuário</Label>
            <Controller
              name="userRole"
              control={control}
              defaultValue={userRole}
              render={({ field: { onChange, value, ref } }) => (
                <Select onValueChange={onChange} value={value} name="userRole">
                  <SelectTrigger ref={ref}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.userRole && (
              <p className="text-red-500 text-sm font-light">
                {errors.userRole.message}
              </p>
            )}
          </div>

          <div className="flex gap-5 ml-auto mt-auto col-span-2">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => reset()} type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={updateUserMutation.isPending} type="submit">
              {updateUserMutation.isPending ? 'Salvando' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
