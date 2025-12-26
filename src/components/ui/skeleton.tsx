import { cn } from "@/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-purple-800/40", className)}
      {...props}
    />
  )
}

export { Skeleton }

