import React from "react"
import { cn } from "../../utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-muted rounded-md",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
          "before:animate-[shimmer_1.5s_ease-in-out_infinite]",
          className,
        )}
        {...props}
      />
    )
  },
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
