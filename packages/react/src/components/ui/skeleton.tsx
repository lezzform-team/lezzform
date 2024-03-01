import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("lf-animate-pulse lf-rounded-md lf-bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
