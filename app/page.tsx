
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-Item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"


const Home = async () => {
  const barbershop = await db.barbershop.findMany({})
  const barbershopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const session = await getServerSession(authOptions)

  const bookings = session?.user ?  await db.booking.findMany({
    where:{
      userId: (session?.user as any).id
  },
  include:{
      service: {
          include: {
              barbershop: true
          }
      }
  }
  }) : []

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user ? session?.user?.name?.split(" ")[0] : "Seja bem vindo!"}</h2>
        <p className="text-xs capitalize">{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })};</p>

        {/* Buscar */}
        <div className="mt-6">
          <Search />
        </div>

        {/** Pesquisa Rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((searchOption) => (
            <Button className="gap-2" variant="secondary" key={searchOption.id} asChild>
              <Link href={`/barbershop?service=${searchOption.title}`}>
                <Image
                  alt={searchOption.title}
                  src={searchOption.imageUrl}
                  width={16}
                  height={16}
                />
                {searchOption.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full max-w-[468px]">
          <Image
            alt="Agende no melhores com a FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Agendamentos</h2>

        {/* Agendamento */}
        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
          {bookings.map(booking =>    
            <BookingItem booking={booking} key={booking.id} />
          )}
        </div>
        

        {/** Recomendados  */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/** */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        
          {barbershopPopular.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
