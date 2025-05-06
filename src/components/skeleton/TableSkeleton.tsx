"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Skeleton } from "@heroui/skeleton";

type TableSkeletonProps = {
  columns: number; // Number of columns to render
  rowCount?: number; // Number of rows to render (default 5)
};

const TableSkeleton = ({ columns, rowCount = 5 }: TableSkeletonProps) => {
  return (
    <Table fullWidth aria-label="Loading Table Skeleton">
      <TableHeader>
        {Array.from({ length: columns }).map((_, idx) => (
          <TableColumn key={idx}> </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton className="h-4 w-full rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
