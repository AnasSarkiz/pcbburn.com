import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NumericControl } from "./numeric-control"

export type LaserProfile = {
  copper: {
    speed: number
    numPasses: number
    frequency: number
    pulseWidth: number
  }
  board: {
    speed: number
    numPasses: number
    frequency: number
    pulseWidth: number
  }
}

type LaserProfileDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialProfile: LaserProfile
  existingProfileNames: string[]
  onSave: (name: string, profile: LaserProfile) => void
}

export function LaserProfileDialog({
  open,
  onOpenChange,
  initialProfile,
  existingProfileNames,
  onSave,
}: LaserProfileDialogProps) {
  const [profileName, setProfileName] = useState("")
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileForm, setProfileForm] = useState<LaserProfile>(initialProfile)

  React.useEffect(() => {
    if (!open) return
    setProfileName("")
    setProfileError(null)
    setProfileForm(initialProfile)
  }, [open, initialProfile])

  const handleSave = () => {
    const trimmedName = profileName.trim()
    if (!trimmedName) {
      setProfileError("Profile name is required.")
      return
    }
    if (existingProfileNames.includes(trimmedName)) {
      setProfileError("A profile with this name already exists.")
      return
    }

    onSave(trimmedName, profileForm)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Laser Profile</DialogTitle>
          <DialogDescription>
            Save the current laser settings as a reusable profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="profile-name" className="text-right">
              Name
            </label>
            <div className="col-span-3 space-y-1">
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => {
                  setProfileName(e.target.value)
                  setProfileError(null)
                }}
                placeholder="e.g. 20W Copper 2-pass"
              />
              {profileError && (
                <div className="text-xs text-destructive">{profileError}</div>
              )}
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Copper Cutting
            </div>
            <NumericControl
              value={profileForm.copper.speed}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  copper: { ...prev.copper, speed: value },
                }))
              }
              label="Speed"
              min={1}
              unit="mm/s"
            />
            <NumericControl
              value={profileForm.copper.numPasses}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  copper: { ...prev.copper, numPasses: value },
                }))
              }
              label="Passes"
              min={1}
              unit=" "
            />
            <NumericControl
              value={profileForm.copper.frequency}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  copper: { ...prev.copper, frequency: value },
                }))
              }
              label="Frequency"
              min={1000}
              unit="kHz"
            />
            <NumericControl
              value={profileForm.copper.pulseWidth}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  copper: { ...prev.copper, pulseWidth: value },
                }))
              }
              label="Pulse Width"
              min={1}
              unit="ns"
            />
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Board Cutting
            </div>
            <NumericControl
              value={profileForm.board.speed}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  board: { ...prev.board, speed: value },
                }))
              }
              label="Speed"
              min={1}
              unit="mm/s"
            />
            <NumericControl
              value={profileForm.board.numPasses}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  board: { ...prev.board, numPasses: value },
                }))
              }
              label="Passes"
              min={1}
              unit=" "
            />
            <NumericControl
              value={profileForm.board.frequency}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  board: { ...prev.board, frequency: value },
                }))
              }
              label="Frequency"
              min={1000}
              unit="kHz"
            />
            <NumericControl
              value={profileForm.board.pulseWidth}
              onChange={(value) =>
                setProfileForm((prev) => ({
                  ...prev,
                  board: { ...prev.board, pulseWidth: value },
                }))
              }
              label="Pulse Width"
              min={1}
              unit="ns"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
