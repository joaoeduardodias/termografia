"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { formattedDate } from "@/utils/formatted-date";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const localChamber = [
  "Câmara 01",
  "Câmara 02",
  "Câmara 03",
  "Câmara 04",
  "Câmara 05"
]
const variationChart = [
  "10 minutos",
  "15 minutos",
  "20 minutos",
  "30 minutos",
  "01 hora"
]
const variationTable = [
  "01 minuto",
  "05 minutos",
  "10 minutos",
  "15 minutos",
  "20 minutos",
  "30 minutos",
]

const generateDataChart = z.object({
  localChamber: z
    .string({ message: "Selecione o local desejado." })
    .refine(value => localChamber.includes(value), {
      message: "Local inválido. Escolha outro local.",
    }),
  variationChart: z
    .string({ message: "Defina a variação desejada no gráfico." })
    .refine(value => variationChart.includes(value), {
      message: "Variação inválida. Escolha outra variação.",
    }),
  variationTable: z
    .string({ message: "Defina a variação desejada na tabela" })
    .refine(value => variationTable.includes(value), {
      message: "Variação inválida. Escolha outra variação.",
    }),
  limit: z.number({ message: "Defina um limite." }),
  detour: z.number({ message: "Defina um desvio" }),
  variationTemp: z.number({ message: "Defina uma variação na coluna de temperatura." }),
  minValue: z.number({ message: "Defina um valor mínimo." }),
  maxValue: z.number({ message: "Defina um valor máximo." }),
  startDate: z.string({ message: "Defina a data de início." }),
  endDate: z.string({ message: "Defina a data final." }),
  description: z.string().nullable(),
})



type GenerateDataChart = z.infer<typeof generateDataChart>
export function FormGenerateChart() {


  const { register, handleSubmit, watch, setValue, control, formState: { isSubmitting, errors } } = useForm<GenerateDataChart>({
    resolver: zodResolver(generateDataChart)
  })

  function handleGenerateDataChart(data: GenerateDataChart) {
    console.log(data)
  }
  const startDateValue = watch('startDate')

  useEffect(() => {
    if (!startDateValue) return
    const convertInDate = new Date(startDateValue)
    const addHoursToStartDate = new Date(convertInDate.setHours(convertInDate.getHours() + 24))
    const formattedEndDate = formattedDate(addHoursToStartDate)
    setValue('endDate', formattedEndDate)

  }, [startDateValue])


  return (
    <form onSubmit={handleSubmit(handleGenerateDataChart)} className="gap-2  flex flex-col items-start">
      <TooltipProvider>
        <div className="flex w-full gap-3">
          <div className="space-y-2 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="localChamber">Local</Label>
                  <Controller
                    name="localChamber"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select onValueChange={onChange} value={value} >
                        <SelectTrigger ref={ref} className="dark:bg-slate-900"  >
                          <SelectValue placeholder="Selecione o local" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Câmara 01">Câmara 01</SelectItem>
                          <SelectItem value="Câmara 02">Câmara 02</SelectItem>
                          <SelectItem value="Câmara 03">Câmara 03</SelectItem>
                          <SelectItem value="Câmara 04">Câmara 04</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

              </TooltipTrigger>
              <TooltipContent side="bottom" >
                Selecione o local que você deseja gerar o gráfico.
              </TooltipContent>
            </Tooltip>

            {errors.localChamber?.message && <p className="text-red-500 text-sm font-light" >{errors.localChamber?.message}</p>}
          </div>
          <div className="space-y-2 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="localChamber">Variação gráfico</Label>
                  <Controller
                    name="variationChart"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select onValueChange={onChange} value={value} >
                        <SelectTrigger ref={ref} className="dark:bg-slate-900" >
                          <SelectValue placeholder="Variação do gráfico" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10 minutos">10 minutos</SelectItem>
                          <SelectItem value="15 minutos">15 minutos</SelectItem>
                          <SelectItem value="20 minutos">20 minutos</SelectItem>
                          <SelectItem value="30 minutos">30 minutos</SelectItem>
                          <SelectItem value="01 hora">01 hora</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

              </TooltipTrigger>
              <TooltipContent side="bottom">
                Selecione a variação desejada para gerar o gráfico.
              </TooltipContent>
            </Tooltip>
            {errors.variationChart?.message && <p className="text-red-500 text-sm font-light" >{errors.variationChart?.message}</p>}
          </div>
          <div className="space-y-2 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="localChamber">Variação tabela</Label>
                  <Controller
                    name="variationTable"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select onValueChange={onChange} value={value} >
                        <SelectTrigger ref={ref} className="dark:bg-slate-900" >
                          <SelectValue placeholder="Variação da tabela" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01 minuto">01 minuto</SelectItem>
                          <SelectItem value="05 minutos">05 minutos</SelectItem>
                          <SelectItem value="10 minutos">10 minutos</SelectItem>
                          <SelectItem value="15 minutos">15 minutos</SelectItem>
                          <SelectItem value="20 minutos">20 minutos</SelectItem>
                          <SelectItem value="30 minutos">30 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

              </TooltipTrigger>
              <TooltipContent side="bottom">
                Selecione a variação desejada para gerar a tabela.
              </TooltipContent>

            </Tooltip>
            {errors.variationTable?.message && <p className="text-red-500 text-sm font-light" >{errors.variationTable?.message}</p>}
          </div>
        </div>

        <div className="flex w-full items-end gap-2">
          <div className="space-y-2 w-20 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="limit">Valor Limite</Label>
                  <Input id="limit" type="number" className="[appearance:textfield]   dark:bg-slate-900 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register('limit', { valueAsNumber: true })} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Valor limite do gráfico, será gerada uma linha vermelha no mesmo.
              </TooltipContent>
            </Tooltip>
            {errors.limit?.message && <p className="text-red-500 text-sm font-light" >{errors.limit?.message}</p>}
          </div>
          <div className="space-y-2 w-20 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="detour">Desvio</Label>

                  <Input id="detour" type="number" className="[appearance:textfield]  dark:bg-slate-900  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register('detour', { valueAsNumber: true })} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Desvio de temperatura da câmara, média da diferença de temperatura de cada leitura no gráfico.
              </TooltipContent>
            </Tooltip>
            {errors.detour?.message && <p className="text-red-500 text-sm font-light" >{errors.detour?.message}</p>}
          </div>
          <div className="space-y-2 w-32 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="variationTemp">Var. Col. Temp.</Label>
                  <Input id="variationTemp" type="number" className="[appearance:tex  dark:bg-slate-900 tfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register('variationTemp', { valueAsNumber: true })} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Variação da coluna de temperatura, padrão 1 Cº.
              </TooltipContent>
            </Tooltip>
            {errors.variationTemp?.message && <p className="text-red-500 text-sm font-light" >{errors.variationTemp?.message}</p>}
          </div>
          <div className="space-y-2 w-20 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="minValue">Valor Min.</Label>

                  <Input id="minValue" type="number" className="[appearance:textfield] dark:bg-slate-900  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register('minValue', { valueAsNumber: true })} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Valor mínimo do gráfico, deixe em branco para ser automático.
              </TooltipContent>
            </Tooltip>
            {errors.minValue?.message && <p className="text-red-500 text-sm font-light" >{errors.minValue?.message}</p>}
          </div>
          <div className="space-y-2 w-20 flex-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="maxValue">Valor Max.</Label>

                  <Input id="maxValue" type="number" className="[appearance:textfield]  dark:bg-slate-900  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...register('maxValue', { valueAsNumber: true })} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Valor máximo do gráfico, deixe em branco para ser automático.
              </TooltipContent>
            </Tooltip>
            {errors.maxValue?.message && <p className="text-red-500 text-sm font-light" >{errors.maxValue?.message}</p>}
          </div>
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="startDate">Data Inicial</Label>
                  <Input id="startDate" type="datetime-local" min="2000-01-01T00:00" max="9999-12-31T23:59" className="dark:bg-slate-900" {...register('startDate')} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Data e hora inicial para gerar o gráfico.
              </TooltipContent>
            </Tooltip>
            {errors.startDate?.message && <p className="text-red-500 text-sm font-light" >{errors.startDate?.message}</p>}
          </div>
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label className="font-light text-sm" htmlFor="endDate">Data Final</Label>
                  <Input id="endDate" type="datetime-local" min="2000-01-01T00:00" max="9999-12-31T23:59" className="dark:bg-slate-900" {...register('endDate')} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Data e hora final para gerar o gráfico.
              </TooltipContent>
            </Tooltip>
            {errors.endDate?.message && <p className="text-red-500 text-sm font-light" >{errors.endDate?.message}</p>}
          </div>
        </div>
        <div className="flex w-full gap-3 items-end">
          <div className="space-y-2 flex-1">
            <Label className="font-light text-sm" htmlFor="description">Informações adicionais</Label>
            <Textarea id="description" placeholder="Informações adicionais que deseja que apareça no gráfico." className="dark:bg-slate-900 resize-none" {...register('description')} />
            {errors.description?.message && <p className="text-red-500 text-sm font-light" >{errors.description?.message}</p>}
          </div>
          <Button disabled={isSubmitting} type="submit" className="dark:bg-blue-600 bg-blue-400 hover:bg-blue-500 hover:dark:bg-blue-500 text-foreground">Gerar gráfico</Button>
          <Button disabled={isSubmitting} type="button" variant="secondary" className="dark:bg-gray-950 bg-slate-300 hover:bg-slate-400 hover:dark:bg-gray-900">Imprimir gráfico</Button>
        </div>



      </TooltipProvider>
    </form>
  )
}