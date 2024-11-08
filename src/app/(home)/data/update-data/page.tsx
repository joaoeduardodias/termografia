'use client'
import { listData, ListDataResponse } from '@/app/http/list-data'
import { SkeletonTable } from '@/components/skeleton-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMutation } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { FormUpdatedData } from './components/form-update-data'
import { TableUpdateData } from './components/table-update-data'


export default function PageManagedData() {

  const [dataValue, setDataValue] = useState<ListDataResponse>()
  const updateDataMutation = useMutation({
    mutationKey: ['update-data'],
    mutationFn: listData,
    onSuccess: (data) => {
      setDataValue(data)
    },
    onError: (error) => {
      console.error(error)
      toast.error('Erro ao listar os dados, por favor tente novamente.', {
        position: 'top-right',
        icon: <CircleX />,
      })
    },
  })

  return (
    <ScrollArea className='flex-1'>
      <div className="grid grid-cols-1 mx-auto px-2 gap-2 py-3">
        <Card className="lg:w-4/5 lg:max-w-6xl lg:mx-auto md:mt-4 bg-muted  dark:bg-slate-800 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl tracking-tight text-blue-600 dark:text-blue-500 underline">
              Editar Dados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormUpdatedData mutate={updateDataMutation.mutateAsync} />
          </CardContent>
        </Card>

        <Card className="lg:w-4/5 lg:max-w-6xl lg:mx-auto md:mt-4 shadow-sm p-4">
          <CardContent className="h-full pt-4">
            {updateDataMutation.isPending ? <SkeletonTable />
              : dataValue?.chartTemperature && (
                <TableUpdateData data={dataValue.chartTemperature} />
              )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
