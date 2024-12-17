import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { LogIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { AuthForm } from "./AuthForm"
import PromptEditor from "./PromptEditor"
import SavedTemplates from "./SavedTemplates"

export function UserNav() {
  const { user, logout } = useAuth()
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [showPromptEditor, setShowPromptEditor] = useState(false)
  const [showSavedTemplates, setShowSavedTemplates] = useState(false)
  const isAdmin = user?.email === 'vikashshingh@gmail.com'

  if (!user) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-gray-100 hover:bg-gray-800"
          onClick={() => setShowAuthForm(true)}
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>

        <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
            </DialogHeader>
            <AuthForm />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.email || ''} />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowSavedTemplates(true)}>
              Saved Templates
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onSelect={() => setShowPromptEditor(true)}>
                Edit Prompt Template
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showSavedTemplates} onOpenChange={setShowSavedTemplates}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saved Templates</DialogTitle>
          </DialogHeader>
          <SavedTemplates />
        </DialogContent>
      </Dialog>

      <PromptEditor 
        open={showPromptEditor} 
        onOpenChange={setShowPromptEditor}
      />
    </>
  )
}