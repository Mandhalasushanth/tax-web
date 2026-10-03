import { useState, useRef, useEffect } from 'react'

/**
 * Reusable custom hook to manage custom dropdown toggle state and outside clicks.
 * Loop-free, pure React functional hook.
 */
export function useDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
  }
}
