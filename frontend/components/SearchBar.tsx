import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar({ className = "" }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const router = useRouter()

  function onSubmit() {
    if (searchQuery) {
      const formattedSearchQuery = searchQuery.replace(" ", "+")
      router.push(`/search?q=${formattedSearchQuery}`)
    }
  }

  return (
    <form
      action={onSubmit}
      className={cn("flex items-center space-x-2", className)}
    >
      <Input
        type="text"
        className="px-3 py-2 bg-white"
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
        placeholder="Search book..."
      />
      <Button variant={"outline"} className="px-3 py-2 cursor-pointer">
        <Search />
      </Button>
    </form>
  )
}
