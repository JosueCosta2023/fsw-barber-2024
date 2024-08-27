"use client"
import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { format, getTime, isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import SingInDialog from "./sing-in-dialog"
import { Dialog, DialogContent } from "./ui/dialog"


interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:15",
  "08:30",
  "08:45",

  "09:00",
  "09:15",
  "09:30",
  "09:45",

  "10:00",
  "10:15",
  "10:30",
  "10:45",

  "11:00",
  "11:15",
  "11:30",
  "11:45",

  "12:00",
  "12:15",
  "12:30",
  "12:45",

  "13:00",
  "13:15",
  "13:30",
  "13:45",

  "14:00",
  "14:15",
  "14:30",
  "14:45",

  "15:00",
  "15:15",
  "15:30",
  "15:45",

  "16:00",
  "16:15",
  "16:30",
  "16:45",

  "17:00",
  "17:15",
  "17:30",
  "17:45",

  "18:00",
  "18:15",
  "18:30",
  "18:45",
]

interface GetTimeLisProsp {
  bookings: Booking[],
  selectedDay: Date
}

const getTimeList = ({bookings, selectedDay}: GetTimeLisProsp) => {

  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), {
      hours: hour, minutes
    }))

    if(timeIsOnThePast && isToday(selectedDay)){
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) => booking.date.getHours() === hour && booking.date.getMinutes() === minutes
    );
  
    if(hasBookingOnCurrentTime){
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const {data} = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingsSheetIsOpen, setBookingsSheetIsOpen] = useState(false)
  const [singDialogIsOpen, setSingDialogIsOpen] = useState(false)


  const handleDaySelected = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {

    if(!selectedDay || !selectedTime) return;

    try {
      const hour = selectedTime.split(":")[0]
      const minutes = selectedTime.split(":")[1]
  
      const newDate = set(selectedDay, {
        minutes: Number(minutes),
        hours: Number(hour)
      })
  
      await createBooking({
        serviceId: service.id,
        date: newDate
      })
      handleBookingSheetOpenchange()
      toast.success("Horario reservado com sucesso.")
      
    } catch (error) {
      console.error(error)
      toast.error("Erro ao reservar horario.")
    }

  }


  useEffect(() => {
    const fetch = async () => {
      if(!selectedDay) return

     const bookings =  await getBookings({date: selectedDay, serviceId: service.id})
     setDayBookings(bookings)
    }

    fetch()

  }, [selectedDay, service.id])

  const handleBookingSheetOpenchange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setBookingsSheetIsOpen(false)
  }

  const handleBookingClick = () => {
    if(data?.user){
      return setBookingsSheetIsOpen(true)
    } 
    
    return setSingDialogIsOpen(true)
    
  }

  const timelist = useMemo(() => {
    if(!selectedDay) return []

    return getTimeList({
      bookings: dayBookings,
      selectedDay
    })
  }, [dayBookings, selectedDay])

  return (
    <>
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet open={bookingsSheetIsOpen} onOpenChange={handleBookingSheetOpenchange}>
              
                <Button variant="secondary" size="sm" onClick={handleBookingClick}>
                  Reservar
                </Button>
              

              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle >Faça sua reserva</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5 w-full">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDaySelected}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "uppercase",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                      },
                      caption: {
                        textTransform: "capitalize"
                      }
                    }}
                    fromDate={new Date()}
                  />
                </div>

                {selectedDay && (
                  <div className="flex gap-3 overflow-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {timelist.length > 0 ? timelist.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelected(time)}
                      >
                        {time}
                      </Button>
                    )): <p className="text-xs">Não há horários disponiveis</p>}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        {/**Name and price the Service */}
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        {/**Data */}
                        <div className="flex items-center justify-between text-gray-400">
                          <h2 className="text-sm">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de '")}

                            <span className="capitalize">
                              {format(selectedDay, "MMMM", { locale: ptBR })}
                            </span>
                          </p>
                        </div>

                        {/**Hour */}
                        <div className="flex items-center justify-between text-gray-400">
                          <h2 className="text-sm">Horario</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        {/**Name */}
                        <div className="flex items-center justify-between text-gray-400">
                          <h2 className="text-sm">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

               <SheetFooter className="px-5 mt-5">
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleCreateBooking} disabled={!selectedDay || !selectedTime}>Confirmar</Button>
                  </SheetClose>
                </SheetFooter>
              
              </SheetContent>
             
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Dialog open={singDialogIsOpen} onOpenChange={(open) => setSingDialogIsOpen(open)}>
      <DialogContent className="w-[90%]">
        <SingInDialog/>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default ServiceItem
