import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function SkeletonTable() {
  return Array.from({ length: 3 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell className="border min-w-52 w-96">
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell className="border min-w-52 w-96">
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell className="border min-w-40">
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell className=" w-4 border">
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell className=" w-4 border">
        <Skeleton className="h-6" />
      </TableCell>
    </TableRow>
  ))
}
