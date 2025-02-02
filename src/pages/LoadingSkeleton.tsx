import type React from "react"

export const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-12 bg-gray-200 rounded-lg"></div>
    ))}
  </div>
)

