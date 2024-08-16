"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/lib/@types"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { deleteUser } from "@/api/users"

interface DataTableRowActionsProps<User> {
  row: Row<User>;
  onEditTriggered: Function
}

export function UserRowActions({
  row,
  onEditTriggered
}: DataTableRowActionsProps<User>) {

  const user: User = row.original

  async function deleteUserAction() {
    try {
      await deleteUser(user.id)
      toast("User deleted successfully")
    } catch (error: any) {
      toast(error.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] bg-background">
        <DropdownMenuItem className="bg-background" onClick={() => onEditTriggered()}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-background text-destructive" onClick={deleteUserAction}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}