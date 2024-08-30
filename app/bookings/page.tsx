import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-Item"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
  const isConfirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  const isConcludeBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="mb-3 mt-6 text-xl font-bold capitalize">
          Meus Agendamentos
        </h1>

        {isConfirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {isConfirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
            ))}
          </>
        )}

        {isConcludeBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {isConcludeBookings.map((booking) => (
              <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
