"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "./checkbox"
import { ColorSwatch } from "./color-swatch"
import { DropdownMenu } from "./dropdown-menu"

interface PhotoFiltersBarProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function PhotoFiltersBar({ filters, onFiltersChange }: PhotoFiltersBarProps) {
  // People filter state
  const [peopleFilters, setPeopleFilters] = useState({
    noPeople: false,
    onePerson: false,
    twoPeople: false,
    threePlusPeople: false,
  })

  // Color filter state
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  // Orientation filter state
  const [orientationFilters, setOrientationFilters] = useState({
    landscape: false,
    portrait: false,
    square: false,
  })

  const colorOptions = [
    { id: "pink", color: "bg-[#E879C7]", label: "Pink" },
    { id: "red", color: "bg-[#C53030]", label: "Red" },
    { id: "orange", color: "bg-[#DD6B20]", label: "Orange" },
    { id: "yellow", color: "bg-[#D69E2E]", label: "Yellow" },
    { id: "green", color: "bg-[#38A169]", label: "Green" },
    { id: "teal", color: "bg-[#319795]", label: "Teal" },
    { id: "blue", color: "bg-[#3182CE]", label: "Blue" },
    { id: "purple", color: "bg-[#805AD5]", label: "Purple" },
    { id: "brown", color: "bg-[#8B4513]", label: "Brown" },
    { id: "black", color: "bg-[#000000]", label: "Black" },
    { id: "light-gray", color: "bg-[#CBD5E0]", label: "Light Gray" },
    { id: "white", color: "bg-white border-2 border-gray-300", label: "White" },
  ]

  const handlePeopleChange = (key: string, checked: boolean) => {
    setPeopleFilters((prev) => ({ ...prev, [key]: checked }))
    // TODO: Update filters and trigger search
  }

  const handleColorToggle = (colorId: string) => {
    setSelectedColors((prev) => (prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]))
    // TODO: Update filters and trigger search
  }

  const handleOrientationChange = (key: string, checked: boolean) => {
    setOrientationFilters((prev) => ({ ...prev, [key]: checked }))
    // TODO: Update filters and trigger search
  }

  // People Dropdown Content
  const PeopleDropdownContent = () => (
    <div className="p-4 w-64">
      <h3 className="text-lg font-semibold text-[#191919] mb-4">People</h3>
      <div className="space-y-3">
        <Checkbox
          id="no-people"
          label="No People"
          checked={peopleFilters.noPeople}
          onChange={(checked) => handlePeopleChange("noPeople", checked)}
        />
        <Checkbox
          id="one-person"
          label="1 person"
          checked={peopleFilters.onePerson}
          onChange={(checked) => handlePeopleChange("onePerson", checked)}
        />
        <Checkbox
          id="two-people"
          label="2 people"
          checked={peopleFilters.twoPeople}
          onChange={(checked) => handlePeopleChange("twoPeople", checked)}
        />
        <Checkbox
          id="three-plus-people"
          label="3+ people"
          checked={peopleFilters.threePlusPeople}
          onChange={(checked) => handlePeopleChange("threePlusPeople", checked)}
        />
      </div>
    </div>
  )

  // Colors Dropdown Content
  const ColorsDropdownContent = () => (
    <div className="p-4 w-80">
      <h3 className="text-lg font-semibold text-[#191919] mb-4">Colors</h3>
      <div className="grid grid-cols-4 gap-3">
        {colorOptions.map((color) => (
          <ColorSwatch
            key={color.id}
            color={color.color}
            isSelected={selectedColors.includes(color.id)}
            onClick={() => handleColorToggle(color.id)}
            label={color.label}
          />
        ))}
      </div>
    </div>
  )

  // Orientation Dropdown Content
  const OrientationDropdownContent = () => (
    <div className="p-4 w-64">
      <h3 className="text-lg font-semibold text-[#191919] mb-4">Orientation</h3>
      <div className="space-y-3">
        <Checkbox
          id="landscape"
          label="Landscape"
          checked={orientationFilters.landscape}
          onChange={(checked) => handleOrientationChange("landscape", checked)}
        />
        <Checkbox
          id="portrait"
          label="Portrait"
          checked={orientationFilters.portrait}
          onChange={(checked) => handleOrientationChange("portrait", checked)}
        />
        <Checkbox
          id="square"
          label="Square"
          checked={orientationFilters.square}
          onChange={(checked) => handleOrientationChange("square", checked)}
        />
      </div>
    </div>
  )

  return (
    <div className="flex gap-4">
      {/* People Dropdown */}
      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">People</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<PeopleDropdownContent />}
      />

      {/* Colors Dropdown */}
      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">Colors</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<ColorsDropdownContent />}
      />

      {/* Orientation Dropdown */}
      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">Orientation</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<OrientationDropdownContent />}
      />
    </div>
  )
}
