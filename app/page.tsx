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
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

const Home = async () => {
  const barbershop = await db.barbershop.findMany({})
  const barbershopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const session = await getServerSession(authOptions)

  const isConfirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">
          Olá,{" "}
          {session?.user
            ? session?.user?.name?.split(" ")[0]
            : "Seja bem vindo!"}
        </h2>
        <p className="text-xs">
          <span className="capitalize">
            {format(new Date(), "EEEE, d", { locale: ptBR })}
          </span>

          <span>{" " + `de` + " "}</span>

          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* Buscar */}
        <div className="mt-6">
          <Search />
        </div>

        {/** Pesquisa Rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((searchOption) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={searchOption.id}
              asChild
            >
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
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende no melhores com a FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {isConfirmedBookings.length > 0 ? (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
        ) : (
          []
        )}

        {/* Agendamento */}
        <div className="flex w-full gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {isConfirmedBookings.map((booking) => (
            <BookingItem booking={JSON.parse(JSON.stringify(booking))} key={booking.id} />
          ))}
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
          Todas as Barbearias
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
