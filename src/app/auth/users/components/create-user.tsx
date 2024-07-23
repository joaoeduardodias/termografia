"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userRoles = ["Administrador", "Nível 1", "Nível 2 ", "Nível 3"]

const signUpForm = z.object({
  name: z.string().min(3, { message: 'O nome de usuário precisa ser maior que 03 caracteres.' }).max(20),
  email: z.string().min(3, { message: 'O e-mail precisa ser maior que 03 caracteres!' }).email({ message: 'Digite um e-mail válido.' }).toLowerCase(),
  password: z.string().min(8, { message: 'A senha precisa ter no mínimo 8 caracteres.' }).max(20),
  confirm_password: z.string(),

  userRole: z
    .string()
    .refine(value => userRoles.includes(value), {
      message: "Nível de acesso inválido. Escolha entre 'Administrador', 'Nível 1' ou 'Nível 2' ou 'Nível 3'",
    }),
}).refine(({ password, confirm_password }) => password === confirm_password, {
  message: "As senhas não coincidem.",
  path: ["confirm_password"]
})



type SignUpForm = z.infer<typeof signUpForm>
export function CreateUser() {

  const { register, handleSubmit, formState: { isSubmitting, errors }, } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm) });

  function handleSignUp(data: SignUpForm) {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full p-3 items-center justify-center group">
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
            Adicionar usuário <span className="pr-2"></span>
          </span>
          <span className=" text-2xl">+</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Informações</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSignUp)} className="w-full gap-2 grid grid-cols-2">

          <div className="space-y-2 ">
            <Label htmlFor="name">Seu Nome</Label>
            <Input id="name" type="text" placeholder="Digite seu nome..." {...register('name')} />
            {errors.name?.message && <p className="text-red-500 text-sm font-light" >{errors.name?.message}</p>}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" placeholder="Digite seu e-mail..." {...register('email')} />
            {errors.email?.message && <p className="text-red-500 text-sm font-light" >{errors.email?.message}</p>}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="password">Sua senha</Label>
            <Input id="password" type="password" placeholder="Digite sua senha..." {...register('password')} />
            {errors.password?.message && <p className="text-red-500 text-sm font-light" >{errors.password?.message}</p>}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="confirm_password">Confirme sua senha</Label>
            <Input id="confirm_password" type="password" placeholder="Confirme sua senha..." {...register('confirm_password')} />
            {errors.confirm_password?.message && <p className="text-red-500 text-sm font-light" >{errors.confirm_password?.message}</p>}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="confirm_password">Tipo de Usuário</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nível 1">Nível 1</SelectItem>
                <SelectItem value="Nível 2">Nível 2</SelectItem>
                <SelectItem value="Nível 3">Nível 3</SelectItem>
                <SelectItem value="Administrador">Administrador</SelectItem>
              </SelectContent>
            </Select>
            {errors.userRole?.message && <p className="text-red-500 text-sm font-light" >{errors.userRole?.message}</p>}
          </div>


          <div className="flex gap-5 ml-auto mt-auto">
            <Button variant="outline" type="button">Cancelar</Button>
            <Button disabled={isSubmitting} type="submit">Salvar</Button>

          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}