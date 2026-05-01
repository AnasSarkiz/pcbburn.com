import { cn } from "@/utils"
import { ChevronDown, Eye, EyeOff, Layers } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import {
  type ExistingCutSetting,
  LIGHTBURN_COLORS,
} from "../helpers/lightburn-cut-settings"

type CuttingLayersVisibilityMenuProps = {
  cutSettings: ExistingCutSetting[]
  hiddenCutIndexes: number[]
  onToggleCutIndex: (cutIndex: number) => void
}

export function CuttingLayersVisibilityMenu({
  cutSettings,
  hiddenCutIndexes,
  onToggleCutIndex,
}: CuttingLayersVisibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const visibleCutSettingCount = cutSettings.length - hiddenCutIndexes.length

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedMenu = menuRef.current?.contains(target)
      const clickedButton = buttonRef.current?.contains(target)
      if (!clickedMenu && !clickedButton) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return

    const updatePosition = () => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.left,
      })
    }

    updatePosition()

    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        ref={buttonRef}
        disabled={cutSettings.length === 0}
      >
        {visibleCutSettingCount}/{cutSettings.length} Cutting layers
        <Layers className="size-3" />
        <ChevronDown
          className={cn(
            "size-3 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-10 w-72 rounded-md border border-border bg-background shadow-md p-2"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            <div className="px-2 pb-1 text-xs font-medium text-muted-foreground">
              Visualize Cutting Layers
            </div>
            <div className="max-h-72 overflow-auto">
              {cutSettings.map((cutSetting) => {
                const isVisible = !hiddenCutIndexes.includes(cutSetting.index)
                const color = LIGHTBURN_COLORS[cutSetting.index] ?? "#000000"

                return (
                  <button
                    key={cutSetting.index}
                    type="button"
                    onClick={() => onToggleCutIndex(cutSetting.index)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-pressed={isVisible}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded ${
                        isVisible ? "text-foreground" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      {isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </span>
                    <span
                      className="size-3.5 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {cutSetting.name}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        C{String(cutSetting.index).padStart(2, "0")} ·{" "}
                        {cutSetting.type} · {color}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
