import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { quickSearchOptions } from "../_constants/search"
import Image from "next/image"

const SidebarSheet = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg?w=740&t=st=1723088362~exp=1723088962~hmac=3e1699c8faee7e40d67eeeb5f9808663d92da88b6fb82c9cea89a30fd7f8160e" />
        </Avatar>
        <div className="ml-3 flex flex-col">
          <span className="font-semibold">Josué Ocanha Costa</span>
          <span className="text-xs text-gray-500">
            contato_jsouecosta@hotmail.com
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href={"/"}>
              <HomeIcon size={18} /> Inicio
            </Link>
          </Button>
        </SheetClose>

        <Button variant="ghost" className="justify-start gap-2">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            variant="ghost"
            className="justify-start gap-2"
            key={option.id}
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col py-5">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} /> Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
