"use client";

import { AppIcon } from "@/components/appIcon";
import { FullscreenModal } from "@/components/fullscreenModal";
import { BarChart3, Brain, Check, Clock, Settings, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Widget = {
  name: string;
  icon: React.ElementType;
  type: "simple" | "page";
  route?: string;
};

export default function HomePage() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const router = useRouter();

  const widgets: Widget[] = [
    { name: "Pomodoro", icon: Timer, type: "simple" },
    { name: "Chrono", icon: Clock, type: "page", route: "/widgets/chrono" },
    { name: "Todo", icon: Check, type: "simple" },
    { name: "Notes", icon: Brain, type: "simple" },
    { name: "Stats", icon: BarChart3, type: "page", route: "/widgets/stats" },
    { name: "Settings", icon: Settings, type: "simple" },
  ];

  const handleClick = (widget: Widget) => {
    if (widget.type === "page" && widget.route) {
      router.push(widget.route);
    } else {
      setActiveWidget(widget.name);
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm grid grid-cols-3 gap-6 place-items-center">
      {widgets.map((w) => (
        <AppIcon
          key={w.name}
          name={w.name}
          icon={w.icon}
          onClick={() => handleClick(w)}
        />
      ))}

      {/* Modal fullscreen */}
      <FullscreenModal
        open={!!activeWidget}
        onClose={() => setActiveWidget(null)}
        title={activeWidget ?? ""}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-center">
            Contenu du widget <b>{activeWidget}</b>
          </p>
        </div>
      </FullscreenModal>
    </div>
  );
}
