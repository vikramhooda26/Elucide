import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

interface ModalWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  triggerLabel: string;
  triggerOnHover?: boolean;
}

export default function ModalWrapper({
  title,
  description,
  children,
  triggerLabel,
  triggerOnHover
}: ModalWrapperProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div style={{ display: "inline-block" }}>
        <Button
          variant="outline"
          onMouseEnter={triggerOnHover ? handleOpen : () => {}}
          // onMouseLeave={triggerOnHover ? handleClose : () => { }}
          onClick={() => setOpen(!open)}
        >
          {triggerLabel}
        </Button>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>{description}</DialogDescription> */}
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
