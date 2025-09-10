"use client"

import type React from "react"
import { useState } from "react"
import { TabItem } from "./tab-item"

/**
 * A customizable tab component that manages multiple tab items and their content.
 * @param {object} props - Component props.
 * @param {Array<{ id: string; label: string; icon?: React.ElementType; badge?: React.ReactNode; content: React.ReactNode }>} props.tabs - An array of tab objects.
 * @param {string} props.initialActiveTabId - The ID of the tab that should be active initially.
 */
interface TabData {
  id: string
  label: string
  icon?: React.ElementType
  badge?: React.ReactNode
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabData[]
  initialActiveTabId: string
}

export function Tabs({ tabs, initialActiveTabId }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(initialActiveTabId)

  const activeTabContent = tabs.find((tab) => tab.id === activeTabId)?.content

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200" role="tablist" aria-label="Content categories">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            badge={tab.badge}
            isActive={activeTabId === tab.id}
            onClick={() => setActiveTabId(tab.id)}
          />
        ))}
      </div>
      <div className="py-4" role="tabpanel" aria-labelledby={`tab-${activeTabId}`}>
        {activeTabContent}
      </div>
    </div>
  )
}
