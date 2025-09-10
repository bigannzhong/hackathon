"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ArrowUp, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-softserve">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <Logo width={100} height={24} variant="light" />
        <Link
          href="/components"
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Go to components page"
        >
          <Image src="/icons/profile.svg" alt="Profile" width={32} height={32} className="w-8 h-8" />
        </Link>
      </nav>

      {/* Header Section */}
      <header className="px-6 py-12 text-center pb-12 pt-20">
        <div className="mx-auto max-w-4xl">
          {/* Experimental Badge */}
          <div className="inline-flex items-center rounded-full bg-[#9CEE69] px-3 py-1 text-sm font-medium text-[#191919] pb-2 pl-4 pr-4 mb-1">
            Experimental
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl text-content-primary md:text-5xl tracking-tight font-bold mb-2 lg:text-5xl">
            What are you creating today?
          </h1>

          <p className="mb-8 text-lg text-content-secondary font-medium md:text-lg mt-1.5">
            Find the right assets fast, then save, remix, and explore them on an infinite canvas
          </p>

          {/* Search Input */}
          <div className="relative mx-auto max-w-2xl">
            <div className="flex items-center border border-gray-200 bg-white p-4 shadow-sm rounded-full">
              <Plus className="mr-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Your creative co-pilot is standing by. Let's create something awesome."
                className="flex-1 border-0 bg-transparent text-base placeholder:text-gray-500 focus-visible:ring-0"
              />
              <Button size="sm" className="ml-3 rounded-full hover:bg-green-600 bg-[rgba(156,238,105,1)]">
                <ArrowUp className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xl font-semibold text-content-primary">Your projects</h2>

          <div className="flex gap-6 flex-wrap">
            {/* First Project Card - Links to Chat */}
            <Link href="/chat" className="w-[262px]">
              <Card className="group cursor-pointer bg-white border border-gray-200 p-3 transition-all hover:shadow-lg rounded-3xl py-4 px-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 justify-items-center">
                    <div className="rounded-xl overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project_1-5veepUTAgXd7DI3Lmz1gxlGk9cd7HO.png"
                        alt="Cat with yellow flower collar"
                        width={100}
                        height={80}
                        className="rounded"
                        unoptimized={true}
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project_2-UrBB4eXjxY2uuKhseCYNQSHyIXovNf.png"
                        alt="Golden retriever holding newspaper"
                        width={100}
                        height={80}
                        className="rounded"
                        unoptimized={true}
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project_2-UrBB4eXjxY2uuKhseCYNQSHyIXovNf.png"
                        alt="Golden retriever holding newspaper"
                        width={100}
                        height={80}
                        className="rounded"
                        unoptimized={true}
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project_5-T3UwVCZg4OolccdQqACzDaw6QuH9ks.png"
                        alt="Black pug wearing striped shirt"
                        width={100}
                        height={80}
                        className="rounded"
                        unoptimized={true}
                      />
                    </div>
                  </div>

                  {/* Title and Arrow */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Pets social campaign</h3>
                    <ArrowUp className="h-4 w-4 text-gray-400 rotate-45 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Additional Project Cards */}
            <Card className="w-[262px] bg-white border border-gray-200 p-3 transition-all hover:shadow-lg rounded-3xl py-4 px-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 justify-items-center">
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/summer-festival-concert-stage.jpg"
                      alt="Summer festival concert stage"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/festival-crowd-dancing.jpg"
                      alt="Festival crowd dancing"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/food-truck-festival.png"
                      alt="Food truck at festival"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/festival-fireworks-night.jpg"
                      alt="Festival fireworks at night"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Summer Festival Promo</h3>
                </div>
              </div>
            </Card>

            <Card className="w-[262px] bg-white border border-gray-200 p-3 transition-all hover:shadow-lg rounded-3xl py-4 px-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 justify-items-center">
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/travel-vlogger-with-camera.jpg"
                      alt="Travel vlogger with camera"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/scenic-mountain-landscape.jpg"
                      alt="Scenic mountain landscape"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/travel-backpack-adventure.jpg"
                      alt="Travel backpack adventure"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="w-[100px] h-[80px] rounded-xl overflow-hidden">
                    <Image
                      src="/vibrant-city-skyline.png"
                      alt="City skyline travel destination"
                      width={100}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Travel Vlog Branding</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Inspirations Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xl font-semibold text-content-primary">Need a spark?</h2>

          {/* Masonry-style Grid */}
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {/* Inspiration Cards with varying heights */}
            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[3/5] bg-gradient-to-br from-orange-100 to-orange-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-teal-100 to-teal-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-indigo-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[5/4] bg-gradient-to-br from-yellow-100 to-yellow-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[2/3] bg-gradient-to-br from-red-100 to-red-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[5/3] bg-gradient-to-br from-cyan-100 to-cyan-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[3/2] bg-gradient-to-br from-violet-100 to-violet-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[4/7] bg-gradient-to-br from-amber-100 to-amber-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[6/4] bg-gradient-to-br from-lime-100 to-lime-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[3/4] bg-gradient-to-br from-rose-100 to-rose-200"></div>
            </Card>

            <Card className="mb-4 break-inside-avoid border-2 border-gray-200 bg-gray-50 p-4">
              <div className="aspect-[7/5] bg-gradient-to-br from-sky-100 to-sky-200"></div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
