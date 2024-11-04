import ImageProcessor from '@/components/ImageProcessor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <ImageProcessor />
      </div>
    </main>
  )
}