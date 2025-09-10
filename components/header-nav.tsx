import { ChevronDown } from "lucide-react"
import { Link } from "./link"
import { Button } from "./button"
import { Logo } from "@/components/logo"
// Removed import for MainSearchBar as it will no longer be part of HeaderNav

/**
 * The main header navigation bar for the Envato Design System.
 */
export function HeaderNav() {
  return (
    <header className="bg-[#191919] text-white py-3 px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        {/* Envato Logo - Dark version for light text on dark background */}
        <Logo width={100} height={24} variant="dark" />

        {/* Navigation Links with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="#" className="flex items-center gap-1 text-white hover:text-gray-300">
            Gen AI <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Video <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Audio <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Graphics <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Templates <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Photos <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            3D <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/search" className="flex items-center gap-1 text-white hover:text-gray-300">
            Fonts <ChevronDown className="w-4 h-4" />
          </Link>
          <Link href="/workspace" className="text-white hover:text-gray-300">
            Workspaces
          </Link>
          <Link href="/project-canvas" className="text-white hover:text-gray-300">
            Project Canvas
          </Link>
          <Link href="#" className="flex items-center gap-1 text-white hover:text-gray-300">
            More <ChevronDown className="w-4 h-4" />
          </Link>
        </nav>
      </div>

      {/* Removed Main Search Bar from here */}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link href="#" className="text-white text-sm hover:text-gray-300">
          Pricing
        </Link>
        <Button variant="primary" className="bg-[#9CEE69] text-[#1A4200] hover:bg-lime-600 px-4 h-9 text-sm">
          Get unlimited downloads
        </Button>
        <Link
          href="/components"
          className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold hover:opacity-80 transition-opacity text-white"
          aria-label="Go to components page"
        >
          SF
        </Link>
      </div>
    </header>
  )
}
