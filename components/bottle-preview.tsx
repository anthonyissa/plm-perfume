import { BoxIcon as Bottle } from 'lucide-react'

export function BottlePreview() {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
      <Bottle className="w-24 h-24 text-gray-400" />
      <p className="ml-4 text-gray-500">Bottle preview placeholder</p>
    </div>
  )
}

