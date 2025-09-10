"use client"

import { useToast } from "./toast"

export function ToastWrapper() {
  const { ToastContainer } = useToast()
  return <ToastContainer />
}
