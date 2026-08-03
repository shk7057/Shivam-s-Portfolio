import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type PortfolioSectionProps = ComponentPropsWithoutRef<"section"> & {
  title?: string;
};

export function PortfolioSection({
  title,
  children,
  className,
  ...props
}: PortfolioSectionProps) {
  return (
    <section
      className={cn(
        "section-viewport relative flex flex-col justify-center overflow-hidden border-b border-border/50 bg-background px-4 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    >
      {title ? (
        <h1 className="text-4xl font-medium uppercase text-foreground sm:text-5xl">
          {title}
        </h1>
      ) : (
        children
      )}
    </section>
  );
}
