import { useEffect, useState } from "react"

export default function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return width
}
