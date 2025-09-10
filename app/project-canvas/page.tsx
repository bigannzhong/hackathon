"use client"

import { Tldraw, createShapeId, AssetRecordType } from "@tldraw/tldraw"
import "@tldraw/tldraw/tldraw.css"
import { CanvasChatPanel } from "../../components/canvas-chat-panel"
import { VerticalToolbar } from "../../components/vertical-toolbar"
import { useSavedItems } from "../../contexts/saved-items-context"
import { ToastWrapper } from "../../components/toast-wrapper"

export default function ProjectCanvas() {
  const { savedItems } = useSavedItems()

  const preloadImage = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }

  const handleMount = async (editor: any) => {
    console.log("[v0] Canvas mounted, saved items:", savedItems)

    if (savedItems.length > 0) {
      const itemsPerRow = 4
      const itemWidth = 200
      const itemHeight = 200
      const spacing = 20
      const startX = 50
      const startY = 50

      const imageLoadPromises = savedItems.map(async (item, index) => {
        try {
          console.log("[v0] Preloading image:", item.src)
          const { width, height } = await preloadImage(item.src)

          const row = Math.floor(index / itemsPerRow)
          const col = index % itemsPerRow
          const x = startX + col * (itemWidth + spacing)
          const y = startY + row * (itemHeight + spacing)

          const assetId = AssetRecordType.createId()
          editor.createAssets([
            {
              id: assetId,
              type: "image",
              typeName: "asset",
              props: {
                name: `saved-item-${index}.jpg`,
                src: item.src,
                w: width,
                h: height,
                mimeType: "image/jpeg",
                isAnimated: false,
              },
              meta: {},
            },
          ])

          const imageShapeId = createShapeId()
          console.log("[v0] Creating image shape:", { id: imageShapeId, assetId, x, y })

          editor.createShape({
            id: imageShapeId,
            type: "image",
            x,
            y,
            props: {
              assetId,
              w: itemWidth,
              h: itemHeight,
            },
          })
        } catch (error) {
          console.error("[v0] Failed to load image:", item.src, error)
          const row = Math.floor(index / itemsPerRow)
          const col = index % itemsPerRow
          const x = startX + col * (itemWidth + spacing)
          const y = startY + row * (itemHeight + spacing)

          const assetId = AssetRecordType.createId()
          editor.createAssets([
            {
              id: assetId,
              type: "image",
              typeName: "asset",
              props: {
                name: "fallback-image.jpg",
                src: "/saved-image.jpg",
                w: 400,
                h: 300,
                mimeType: "image/jpeg",
                isAnimated: false,
              },
              meta: {},
            },
          ])

          const imageShapeId = createShapeId()
          editor.createShape({
            id: imageShapeId,
            type: "image",
            x,
            y,
            props: {
              assetId,
              w: itemWidth,
              h: itemHeight,
            },
          })
        }
      })

      await Promise.allSettled(imageLoadPromises)

      setTimeout(() => {
        editor.zoomToFit()
      }, 100)
    } else {
      const assetId = AssetRecordType.createId()
      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: "example-canvas-image.jpg",
            src: "/example-canvas-image.jpg",
            w: 600,
            h: 400,
            mimeType: "image/jpeg",
            isAnimated: false,
          },
          meta: {},
        },
      ])

      const imageShapeId = createShapeId()
      editor.createShape({
        id: imageShapeId,
        type: "image",
        x: 100,
        y: 100,
        props: {
          assetId,
          w: 300,
          h: 200,
        },
      })
      editor.zoomToFit()
    }
  }

  const handleSearch = async (query: string, filters: any) => {
    console.log("[v0] Search triggered:", { query, filters })
    return {
      results: [],
      totalResults: 0,
    }
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      <div className="w-[35%] max-w-[560px] flex-shrink-0 border-r border-gray-200">
        <CanvasChatPanel onSearch={handleSearch} />
      </div>

      <div className="flex-1 min-w-0 relative">
        <Tldraw
          onMount={handleMount}
          components={{
            Toolbar: null,
            ActionsMenu: null,
            HelpMenu: null,
            ZoomMenu: null,
            MainMenu: null,
          }}
        />
        <VerticalToolbar />
      </div>
      <ToastWrapper />
    </div>
  )
}
