"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <DialogContent className="inset-0! top-0! left-0! translate-x-0! translate-y-0! w-full! max-w-none! h-screen bg-neutral-900 text-white border-none rounded-none p-0 flex flex-col">
        <DialogHeader className="flex justify-between items-center px-4 py-2 bg-neutral-800 border-b border-neutral-700">
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
