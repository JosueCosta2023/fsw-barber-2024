"use client"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import SingInDialog from "./sing-in-dialog"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLogoutClick = () => signOut()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                alt={data?.user.name ?? ""}
                src={data?.user.image ?? ""}
              />
            </Avatar>
            <div className="ml-3 flex flex-col">
              <span className="font-semibold">{data.user.name}</span>
              <span className="text-xs text-gray-500">{data.user.email}</span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SingInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href={"/"}>
              <HomeIcon size={18} /> Inicio
            </Link>
          </Button>
        </SheetClose>

        {data?.user && (
        <Button variant="ghost" className="justify-start gap-2">
          <CalendarIcon size={18} />
          Meus Agendamentos
        </Button>
        )}

      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <h2 className="text-sm uppercase text-gray-400">Busque um serviço</h2>
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.id} asChild>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href={`/barbershop?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="flex flex-col py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} /> Sair da Conta
          </Button>
        </div>
      )}

    </SheetContent>
  )
}

export default SidebarSheet
