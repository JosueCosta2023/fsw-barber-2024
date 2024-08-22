import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-Item";

const Bookings = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return notFound()
    }
    const isConfirmedBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date:{
                gte: new Date()
            }
        },
        include:{
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    })

    const isConcludeBookings = await db.booking.findMany({
        where:{
            userId: (session.user as any).id,
            date:{
                lt: new Date()
            }
        },
        include:{
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    })

    return ( 
        <>
            <Header/>
            <div className="p-5 space-y-3">
                <h1 className="text-xl font-bold capitalize mb-3 mt-6">Meus Agendamentos</h1>

                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Confirmados</h2>
                {isConfirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking}/>)}


                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Finalizados</h2>
                {isConcludeBookings.map(booking => <BookingItem key={booking.id} booking={booking}/>)}
            </div>
        </> 
    );
}
 
export default Bookings;