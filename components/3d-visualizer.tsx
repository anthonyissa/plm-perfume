'use client'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

function Model({ url }: { url: string }) {
  const [error, setError] = useState<string | null>(null)
  const { scene } = useGLTF(url, true, undefined, (err) => {
    console.error('Error loading model:', err)
    setError('Failed to load 3D model')
  })

  if (error) {
    return null
  }

  return <primitive object={scene} />
}

export function BottleVisualizer({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-64 relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Model url={modelUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/placeholder.svg')

