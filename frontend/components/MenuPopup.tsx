import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FileStack, Home, LucideBookUser, MenuIcon, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function MenuPopup({ currentPage }: { currentPage: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="block xs:block sm:hidden md:hidden lg:hidden xl:hidden">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2 flex w-full flex-col items-center justify-center">
            <h4 className="leading-none text-xl mb-2 font-bold">Chapter</h4>
            <Link
              href={"/"}
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button
                variant={currentPage === "" ? "default" : "secondary"}
                className="w-full flex items-center gap-3"
              >
                <Home />
                <p className="text-lg">Home</p>
              </Button>
            </Link>
            <Link
              href={"/search"}
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button
                variant={currentPage === "search" ? "default" : "secondary"}
                className="w-full flex items-center gap-3"
              >
                <Search />
                <p className="text-lg">Search</p>
              </Button>
            </Link>
            <Link
              href={"/collection"}
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button
                variant={currentPage === "collection" ? "default" : "secondary"}
                className="w-full flex items-center gap-3"
              >
                <LucideBookUser />
                <p className="text-lg">My collection</p>
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
