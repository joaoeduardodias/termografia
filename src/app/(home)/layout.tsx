import { Header } from '@/components/header'
import { SideBar } from '@/components/sidebar'
import { DialogProvider } from '@/context/open-dialog'

import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-full flex flex-col">
        <DialogProvider>
          <Header />
          {children}
        </DialogProvider>
        <footer className="border-t shadow-sm flex justify-center items-center text-xs lg:text-sm tracking-wide text-muted-foreground py-5 ">
          Termografia | suporte2.apms@frigosul.com.br
        </footer>
      </div>
    </div>
  )
}
