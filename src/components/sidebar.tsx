import { BadgeInfo, BetweenHorizontalEnd, Database, LayoutGrid, LineChart, LockKeyhole, LogOut, ScrollText, Users } from "lucide-react";
import { NavLink } from "./nav-link";

export function SideBar() {

  return (
    <aside className="flex flex-col h-screen border-r px-4">
      <p className="m-4 text-center text-xl uppercase tracking-tight font-medium">Menu</p>
      <nav className="flex flex-col space-y-4 mt-5 h-full pb-8">

        <NavLink href="/" >
          <LayoutGrid size={20} />
          Home
        </NavLink>
        <NavLink href="/auth/users" >
          <Users size={20} />
          Usuários
        </NavLink>
        <NavLink href="/data/chart" >
          <LineChart size={20} />
          Gerar gráfico
        </NavLink>
        <NavLink href="/data/managed-data" >
          <Database size={20} />
          Gerenciar dados
        </NavLink>
        <NavLink href="/data/managed-standards" >
          <ScrollText size={20} />
          Gerenciar padrões
        </NavLink>
        <NavLink href="/data/managed-equipments" >
          <BetweenHorizontalEnd size={20} />
          Gerenciar equipamentos
        </NavLink>
        <NavLink href="/data/register-access" >
          <BadgeInfo size={20} />
          Registro de acessos
        </NavLink>
        <NavLink href="/auth/reset-password" >
          <LockKeyhole size={20} />
          Alterar senha
        </NavLink>
        <NavLink href="/auth/sign-in">
          <LogOut size={20} className="rotate-180" />
          Sair
        </NavLink>
      </nav>
    </aside>
  )
}