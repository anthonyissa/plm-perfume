'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Button } from "@/components/ui/button"

function Model({ url }: { url: string }) {
  const [error, setError] = useState<string | null>(null)
  const { scene, errors } = useGLTF(url, true, undefined, (err) => {
    console.error('Error loading model:', err)
    setError('Failed to load 3D model')
  })

  useEffect(() => {
    if (errors.length > 0) {
      setError('Failed to load 3D model')
    }
  }, [errors])

  if (error) {
    return null
  }

  return <primitive object={scene} />
}

export function BottleVisualizer({ modelUrl }: { modelUrl: string }) {
  const [fallback, setFallback] = useState(false)

  if (fallback) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">3D model preview not available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64 relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model url={modelUrl} />
        <OrbitControls />
      </Canvas>
      <Button 
        className="absolute top-2 right-2" 
        variant="secondary" 
        size="sm"
        onClick={() => setFallback(true)}
      >
        Switch to 2D View
      </Button>
    </div>
  )
}

useGLTF.preload('/placeholder.svg')

