"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

export const getConludedBookings = async () => {
    const session = await getServerSession(authOptions)

    if(!session?.user){
        return []
    }

    return await db.booking.findMany({
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
}