import React from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function LoadingButton({
  variant = "default",
  className = "",
  isLoading,
  children,
  onClick = () => {},
}: {
  isLoading: boolean
  className?: string
  variant?: "outline" | "link" | "default" | "destructive"
  children: string | React.ReactNode
  onClick?: () => void
}) {
  return (
    <Button onClick={onClick} variant={variant} className={className}>
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  )
}
