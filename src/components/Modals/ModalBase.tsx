import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Fragment, useState } from 'react'

function ModalBase(props: {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  title: string,
  description?: string;
  trigger: JSX.Element,
  footer?: JSX.Element,
  children: any;
  className: string
}) {

  function onOpenChanged(open: boolean) {
    if (!open) {
      props.onClose?.()
    } else {
      props.onOpen?.()
    }
  }

  return (
    <Dialog open={props.open} onOpenChange={onOpenChanged}>
      <DialogTrigger asChild>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.description && <DialogDescription>
            {props.description}
          </DialogDescription>}
        </DialogHeader>
        {props.children}
        {props.footer && <DialogFooter>
          {props.footer}
        </DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

export default ModalBase