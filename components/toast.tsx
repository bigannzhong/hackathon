"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface ToastProps {
  message: string
  duration?: number
  onClose: () => void
}

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 200) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (typeof window === "undefined") return null

  return createPortal(
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 max-w-sm">
        <p className="text-sm text-gray-900">{message}</p>
      </div>
    </div>,
    document.body,
  )
}

// Toast manager hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([])

  const showToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const ToastContainer = () => (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
      ))}
    </>
  )

  return { showToast, ToastContainer }
}
