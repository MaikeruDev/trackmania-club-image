'use client'

import React, { useState, useCallback } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { saveAs } from 'file-saver'

const imageVariations = [
  { name: 'Logo', aspectRatio: 1 / 1, width: 256, height: 256, formats: ['png', 'jpeg'] },
  { name: 'Decal', aspectRatio: 1 / 1, width: 1024, height: 1024, formats: ['png', 'jpeg'] },
  { name: 'Decal sponsor', aspectRatio: 4 / 1, width: 1024, height: 256, formats: ['png', 'jpeg'] },
  { name: 'Vertical', aspectRatio: 45 / 58, width: 720, height: 928, formats: ['png', 'jpeg'] },
  { name: 'Screen 16*9', aspectRatio: 16 / 9, width: 1920, height: 1080, formats: ['png'] },
  { name: 'Screen 8*1', aspectRatio: 8 / 1, width: 2048, height: 256, formats: ['png'] },
  { name: 'Screen 16*1', aspectRatio: 16 / 1, width: 4096, height: 256, formats: ['png'] },
  { name: 'Background', aspectRatio: 16 / 9, width: 1920, height: 1080, formats: ['png', 'jpeg'] },
]

export default function ImageProcessor() {
  const [src, setSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<typeof imageVariations[0] | null>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result?.toString() || null))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img)
  }, [])

  const processImage = async (variation: typeof imageVariations[0]) => {
    if (!image || !crop) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
 
    const cropWidth = crop.width * scaleX
    const cropHeight = crop.height * scaleY
 
    const cropAspectRatio = cropWidth / cropHeight
    const targetAspectRatio = variation.width / variation.height

    let sourceX = crop.x * scaleX
    let sourceY = crop.y * scaleY
    let sourceWidth = cropWidth
    let sourceHeight = cropHeight
 
    if (cropAspectRatio > targetAspectRatio) { 
      sourceWidth = sourceHeight * targetAspectRatio
      sourceX += (cropWidth - sourceWidth) / 2
    } else if (cropAspectRatio < targetAspectRatio) { 
      sourceHeight = sourceWidth / targetAspectRatio
      sourceY += (cropHeight - sourceHeight) / 2
    }
 
    canvas.width = variation.width
    canvas.height = variation.height
 
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      variation.width,
      variation.height
    )

    setProcessedImage(canvas.toDataURL('image/png'))
    setSelectedVariation(variation)
  }

  const downloadImage = () => {
    if (!processedImage || !selectedVariation) return

    selectedVariation.formats.forEach(format => {
      const link = document.createElement('a')
      link.download = `${selectedVariation.name}.${format}`
      link.href = processedImage
      link.click()
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
      <CardHeader className="border-b border-blue-500">
        <CardTitle className="text-3xl font-bold text-center">Trackmania Club Image Processor</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-white/10 p-4 rounded-lg">
            <Label htmlFor="image-upload" className="text-lg font-semibold mb-2 block">Upload Your Image</Label>
            <Input id="image-upload" type="file" accept="image/*" onChange={onSelectFile} className="bg-white/20 text-white" />
          </div>
          {src && (
            <div className="bg-white/10 p-4 rounded-lg">
              <Label htmlFor="image-upload" className="text-lg font-semibold mb-2 block">Drag over the image to select an area</Label>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={16 / 9}
              >
                <img src={src} onLoad={(e) => onImageLoad(e.currentTarget)} alt="Source" className="max-w-full h-auto" />
              </ReactCrop>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageVariations.map((variation) => (
              <Button
                key={variation.name}
                onClick={() => processImage(variation)}
                disabled={!src || !crop}
                className="bg-white hover:bg-white text-black font-bold py-2 px-4 rounded transition duration-300"
              >
                Generate {variation.name}
              </Button>
            ))}
          </div>
          {processedImage && (
            <div className="bg-white/10 p-4 rounded-lg mt-6">
              <h3 className="text-xl font-semibold mb-4">Processed Image</h3>
              <img src={processedImage} alt="Processed" className="max-w-full h-auto mb-4 rounded" />
              <Button 
                onClick={downloadImage} 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Download {selectedVariation?.name}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}