import React, { useState } from "react"
import { cn } from "../utils"
import { Skeleton } from "./ui/skeleton"

interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  skeletonClassName?: string
}

const ImageWithSkeleton = React.forwardRef<
  HTMLImageElement,
  ImageWithSkeletonProps
>(
  (
    { src, alt, className, skeletonClassName, onLoad, onError, ...props },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      onLoad?.(e)
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      setHasError(true)
      onError?.(e)
    }

    return (
      <div className="relative">
        {isLoading && !hasError && (
          <Skeleton className={cn("absolute inset-0", skeletonClassName)} />
        )}
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-md">
            <span className="text-sm text-muted-foreground">
              Failed to load image
            </span>
          </div>
        )}
      </div>
    )
  },
)

ImageWithSkeleton.displayName = "ImageWithSkeleton"

export { ImageWithSkeleton }
