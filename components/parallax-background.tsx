"use client"

import { useEffect } from "react"

export function ParallaxBackground() {
  useEffect(() => {
    let ticking = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { clientX, clientY } = e
          const { innerWidth, innerHeight } = window

          const moveX = (clientX / innerWidth - 0.5) * 10
          const moveY = (clientY / innerHeight - 0.5) * 10

          document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`
          ticking = false
        })
        ticking = true
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const parallax = scrolled * 0.3

          document.body.style.backgroundPositionY = `${50 + (parallax / window.innerHeight) * 10}%`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}
