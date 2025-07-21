import React from "react"
import { Skeleton } from "./ui/skeleton"

export default function BookPageSkeleton() {
  return (
    <div className="flex flex-col w-[90%]">
      <div className="container flex gap-10">
        <Skeleton className="w-[300px] h-[500px]" />
        <div className="w-[50%] flex flex-col gap-5">
          <Skeleton className="h-10 w-[50%]" />
          <div className="mt-5 flex flex-col gap-5">
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-5 w-[80%]" />
            <Skeleton className="h-30 w-[90%]" />
            <Skeleton className="h-30 w-[90%]" />
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}
