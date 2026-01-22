import React from "react"
import { cn } from "../../utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  className?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "size-4",
      md: "size-8",
      lg: "size-12",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full border-2 border-primary/20 border-t-primary animate-spin",
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  },
)

Spinner.displayName = "Spinner"

export { Spinner }
