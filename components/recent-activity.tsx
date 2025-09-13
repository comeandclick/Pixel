"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useActivity } from "@/components/activity-tracker"
import {
  History,
  Scissors,
  ImageIcon,
  Maximize,
  RefreshCw,
  Video,
  Droplets,
  User,
  LogIn,
  LogOut,
  FileText,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

const activityIcons = {
  tool_used: {
    background_removal: Scissors,
    image_compressor: ImageIcon,
    image_resizer: Maximize,
    format_converter: RefreshCw,
    video_compressor: Video,
    watermark_remover: Droplets,
    default: FileText,
  },
  profile_updated: User,
  login: LogIn,
  logout: LogOut,
  file_processed: FileText,
}

const activityColors = {
  tool_used: "bg-blue-500/20 text-blue-400",
  profile_updated: "bg-green-500/20 text-green-400",
  login: "bg-purple-500/20 text-purple-400",
  logout: "bg-gray-500/20 text-gray-400",
  file_processed: "bg-orange-500/20 text-orange-400",
}

export function RecentActivity({ limit = 5, showHeader = true }: { limit?: number; showHeader?: boolean }) {
  const { getRecentActivities, clearActivities } = useActivity()
  const recentActivities = getRecentActivities(limit)

  const getActivityIcon = (type: string, toolName?: string) => {
    if (type === "tool_used" && toolName) {
      const IconComponent =
        activityIcons.tool_used[toolName as keyof typeof activityIcons.tool_used] || activityIcons.tool_used.default
      return IconComponent
    }
    return activityIcons[type as keyof typeof activityIcons] || FileText
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  if (recentActivities.length === 0) {
    return (
      <Card className="gradient-card">
        {showHeader && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Activité Récente
            </CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune activité récente</p>
            <p className="text-sm text-muted-foreground mt-2">Utilisez nos outils pour voir votre activité ici</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="gradient-card">
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Activité Récente
            </CardTitle>
            {recentActivities.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearActivities}
                className="text-muted-foreground hover:text-foreground"
              >
                Effacer
              </Button>
            )}
          </div>
          <CardDescription>Vos {limit} dernières actions</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type, activity.metadata?.toolName)
            const colorClass =
              activityColors[activity.type as keyof typeof activityColors] || "bg-gray-500/20 text-gray-400"

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  {activity.metadata && (
                    <div className="flex gap-2 mt-1">
                      {activity.metadata.fileName && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {activity.metadata.fileName}
                        </span>
                      )}
                      {activity.metadata.fileSize && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {formatFileSize(activity.metadata.fileSize)}
                        </span>
                      )}
                      {activity.metadata.processingTime && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {activity.metadata.processingTime}ms
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
