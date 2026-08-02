import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type PortfolioSectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
};

export function PortfolioSection({
  title,
  className,
  ...props
}: PortfolioSectionProps) {
  return (
    <section
      className={cn(
        "section-viewport grid place-items-center border-b border-border/50 bg-background",
        className,
      )}
      {...props}
    >
      <h1 className="text-4xl font-medium uppercase text-foreground sm:text-5xl">
        {title}
      </h1>
    </section>
  );
}
