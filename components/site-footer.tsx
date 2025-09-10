import Image from "next/image"
import {
  Instagram,
  InstagramIcon as Tiktok,
  Facebook,
  Youtube,
  Dribbble,
  PinIcon as Pinterest,
  X,
  Globe,
  ChevronDown,
} from "lucide-react"
import { Link } from "./link"
import { Divider } from "./divider" // Import Divider component
import { Logo } from "@/components/logo"

/**
 * The main footer component for the Envato Design System.
 */
export function SiteFooter() {
  return (
    <footer className="bg-[#FFF5ED] py-12 px-8 text-gray-700 text-sm">
      <div className="">
        {/* Top Section: Logo and Social Icons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          {/* Envato Logo - Light version for dark text on light background */}
          <Logo width={120} height={24} variant="light" className="mb-4 md:mb-0" />
          <div className="flex gap-4">
            <Link href="#" className="hover:text-black" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="TikTok">
              <Tiktok className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="Dribbble">
              <Dribbble className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="Pinterest">
              <Pinterest className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-black" aria-label="X (formerly Twitter)">
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <Divider className="my-8 border-gray-200" />

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-black mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  About Envato
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Our Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Stock Video
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Video Templates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Royalty-Free Music
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Stock Photos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Fonts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Popular Searches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">License & User Terms</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  License Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Fair Use Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Do not sell or share my personal information
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  Discover Tuts+
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Video & Music
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Explore Blog
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold text-black mt-6 mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Become an Affiliate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-4">About Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Our Purpose
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Our Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Company Blog
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold text-black mt-6 mb-4">Authors</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-black">
                  Become an Author
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Author Sign In
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Author Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="my-8 border-gray-200" />

        {/* Bottom Section: Copyright and Language Selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/placeholder.svg?height=40&width=40" alt="Certified B Corporation" width={40} height={40} />
            <p className="text-xs">
              © 2025 Envato{" "}
              <Link href="#" className="text-gray-700 hover:text-black">
                Trademarks
              </Link>{" "}
              and brands are the property of their respective owners.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-700 hover:text-black">
              Envato Market
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Envato Tuts+
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Placeit by Envato
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Mixkit
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              All Products
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black">
              Sitemap
            </Link>
            <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-black">
              <Globe className="w-4 h-4" />
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
