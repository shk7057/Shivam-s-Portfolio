import type { ReactNode } from "react";

import { Navbar } from "@/components/navigation/navbar";
import { GrainOverlay } from "@/components/ui/grain-overlay";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
