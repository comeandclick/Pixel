"use client"

import type React from "react"

type Props = {
  scene?: string
  className?: string
  fallback?: React.ReactNode
}

export default function SplineScene({ className, fallback }: Props) {
  return (
    <div
      className={className}
      aria-label="3D preview disabled"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {fallback ?? <div style={{ opacity: 0.6 }}>3D preview disabled</div>}
    </div>
  )
}
