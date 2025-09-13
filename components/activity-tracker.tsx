"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/components/auth-provider"

interface Activity {
  id: string
  type: "tool_used" | "profile_updated" | "login" | "logout" | "file_processed"
  title: string
  description: string
  timestamp: Date
  metadata?: {
    toolName?: string
    fileName?: string
    fileSize?: number
    processingTime?: number
  }
}

interface ActivityContextType {
  activities: Activity[]
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void
  getRecentActivities: (limit?: number) => Activity[]
  clearActivities: () => void
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

export function ActivityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])

  // Load activities from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedActivities = localStorage.getItem(`activities_${user.id}`)
      if (savedActivities) {
        const parsed = JSON.parse(savedActivities)
        // Convert timestamp strings back to Date objects
        const activitiesWithDates = parsed.map((activity: any) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
        }))
        setActivities(activitiesWithDates)
      }
    }
  }, [user])

  // Save activities to localStorage whenever they change
  useEffect(() => {
    if (user && activities.length > 0) {
      localStorage.setItem(`activities_${user.id}`, JSON.stringify(activities))
    }
  }, [activities, user])

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    if (!user) return

    const newActivity: Activity = {
      ...activity,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    setActivities((prev) => [newActivity, ...prev].slice(0, 100)) // Keep only last 100 activities
  }

  const getRecentActivities = (limit = 10) => {
    return activities.slice(0, limit)
  }

  const clearActivities = () => {
    setActivities([])
    if (user) {
      localStorage.removeItem(`activities_${user.id}`)
    }
  }

  return (
    <ActivityContext.Provider value={{ activities, addActivity, getRecentActivities, clearActivities }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  const context = useContext(ActivityContext)
  if (context === undefined) {
    throw new Error("useActivity must be used within an ActivityProvider")
  }
  return context
}
