"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function FullscreenModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-screen bg-neutral-900 text-white border-none rounded-none p-0 flex flex-col">
        <DialogHeader className="flex justify-between items-center px-4 py-2 bg-neutral-800 border-b border-neutral-700">
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
