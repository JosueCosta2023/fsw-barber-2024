import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { Pick } from "@prisma/client/runtime/library"
import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">,
  barbershop: Pick<Barbershop, "name">,
  selectedDate: Date
}

const BookingSummary = ({service, barbershop, selectedDate}: BookingSummaryProps) => {
  return (
    <>
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
              {format(selectedDate, "d 'de '")}

              <span className="capitalize">
                {format(selectedDate, "MMMM", { locale: ptBR })}
              </span>
            </p>
          </div>

          {/**Hour */}
          <div className="flex items-center justify-between text-gray-400">
            <h2 className="text-sm">Horario</h2>
            <p className="text-sm">{format(selectedDate, "HH:mm")}</p>
          </div>

          {/**Name */}
          <div className="flex items-center justify-between text-gray-400">
            <h2 className="text-sm">Barbearia</h2>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingSummary
