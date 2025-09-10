"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "./checkbox"
import { ColorSwatch } from "./color-swatch"
import { DropdownMenu } from "./dropdown-menu"
import { DynamicFilterDropdown } from "./dynamic-filter-dropdown"
import { detectFiltersFromQuery, type DetectedFilter } from "../utils/filter-detection"

interface EnhancedPhotoFiltersBarProps {
  filters: any
  searchQuery: string
  onFiltersChange: (filters: any) => void
}

export function EnhancedPhotoFiltersBar({ filters, searchQuery, onFiltersChange }: EnhancedPhotoFiltersBarProps) {
  // Base filter states
  const [peopleFilters, setPeopleFilters] = useState({
    noPeople: false,
    onePerson: false,
    twoPeople: false,
    threePlusPeople: false,
  })

  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [orientationFilters, setOrientationFilters] = useState({
    landscape: false,
    portrait: false,
    square: false,
  })

  // Dynamic filter states
  const [detectedFilters, setDetectedFilters] = useState<DetectedFilter[]>([])
  const [dynamicFilterValues, setDynamicFilterValues] = useState<Record<string, string>>({})

  // Detect filters when search query changes
  useEffect(() => {
    if (searchQuery) {
      const detected = detectFiltersFromQuery(searchQuery)
      setDetectedFilters(detected)

      // Initialize dynamic filter values with pre-selected options
      const initialValues: Record<string, string> = {}
      detected.forEach((filter) => {
        if (filter.preSelected) {
          initialValues[filter.type] = filter.preSelected
        }
      })
      setDynamicFilterValues(initialValues)

      // Trigger filter change with detected values
      if (Object.keys(initialValues).length > 0) {
        onFiltersChange({
          ...filters,
          ...initialValues,
        })
      }
    } else {
      // Clear dynamic filters when no query
      setDetectedFilters([])
      setDynamicFilterValues({})
    }
  }, [searchQuery])

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

  const handleDynamicFilterChange = (filterType: string, value: string) => {
    const newValues = {
      ...dynamicFilterValues,
      [filterType]: value === "All" ? undefined : value,
    }
    setDynamicFilterValues(newValues)

    // Update filters and trigger search
    onFiltersChange({
      ...filters,
      ...newValues,
    })
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
    <div className="flex gap-4 flex-wrap justify-center rounded-[32px]">
      {/* Base Filters */}
      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[48px] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">People</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<PeopleDropdownContent />}
      />

      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[48px] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">Colors</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<ColorsDropdownContent />}
      />

      <DropdownMenu
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[48px] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:border-black">
            <span className="text-sm">Orientation</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        }
        items={[]}
        customContent={<OrientationDropdownContent />}
      />

      {/* Dynamic Contextual Filters */}
      {detectedFilters.map((filter) => (
        <DynamicFilterDropdown
          key={filter.type}
          filter={filter}
          value={dynamicFilterValues[filter.type] || ""}
          onChange={(value) => handleDynamicFilterChange(filter.type, value)}
        />
      ))}
    </div>
  )
}
