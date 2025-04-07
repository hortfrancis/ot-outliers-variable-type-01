import { useState, useEffect, useCallback } from "react"

export default function VariableTypePlayground() {
  const [weight, setWeight] = useState(400)
  const [opticalSize, setOpticalSize] = useState(24)
  const [isDancing, setIsDancing] = useState(false)

  // Animation parameters
  const animateAxes = useCallback(() => {
    const time = Date.now() * 0.001 // Convert to seconds for smoother animation
    
    // Animate weight between 100 and 900 using sin wave
    const newWeight = Math.round(500 + Math.sin(time * 2) * 400)
    
    // Animate optical size between 6 and 48 using cos wave
    // Using different frequency for interesting combinations
    const newOpticalSize = Math.round(27 + Math.cos(time * 3) * 21)
    
    setWeight(newWeight)
    setOpticalSize(newOpticalSize)
  }, [])

  useEffect(() => {
    let animationFrame: number

    if (isDancing) {
      const animate = () => {
        animateAxes()
        animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isDancing, animateAxes])

  return (
    <div className="flex flex-col items-center justify-center p-[5vw]">
      {/* Main text display */}
      <h1
        className={`text-[10vw]/[12vw] mb-12 ${!isDancing ? 'transition-all duration-300' : ''}`}
        style={{
          fontVariationSettings: `"wght" ${weight}, "opsz" ${opticalSize}`
        }}
      >
        Variable Typographia
      </h1>

      {/* Controls */}
      <div className="w-full max-w-md space-y-8 bg-white border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Weight Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="weight" className="text-lg font-bold">
              Weight (<code className="text-black">wght</code>)
            </label>
            <span className="text-lg font-mono bg-black text-white px-2">{weight}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              id="weight"
              min="100"
              max="900"
              step="1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              disabled={isDancing}
              className="
                w-full h-3 appearance-none cursor-pointer bg-white
                border-4 border-black
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:bg-black
                [&::-webkit-slider-thumb]:border-4
                [&::-webkit-slider-thumb]:border-black
                [&::-webkit-slider-thumb]:rounded-none
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6
                [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:bg-black
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-black
                [&::-moz-range-thumb]:rounded-none
                [&::-moz-range-thumb]:cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Thin 100</span>
            <span>Black 900</span>
          </div>
        </div>

        {/* Optical Size Control */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="optical-size" className="text-lg font-bold">
              Optical Size (<code>opsz</code>)
            </label>
            <span className="text-lg font-mono bg-black text-white px-2">{opticalSize}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              id="optical-size"
              min="6"
              max="48"
              step="1"
              value={opticalSize}
              onChange={(e) => setOpticalSize(Number(e.target.value))}
              disabled={isDancing}
              className="
                w-full h-3 appearance-none cursor-pointer bg-white
                border-4 border-black
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:bg-black
                [&::-webkit-slider-thumb]:border-4
                [&::-webkit-slider-thumb]:border-black
                [&::-webkit-slider-thumb]:rounded-none
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6
                [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:bg-black
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-black
                [&::-moz-range-thumb]:rounded-none
                [&::-moz-range-thumb]:cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            />
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Small 6</span>
            <span>Display 48</span>
          </div>
        </div>

        {/* Dance Button */}
        <button
          onClick={() => setIsDancing(!isDancing)}
          className="
            w-full py-3 px-6
            bg-white border-4 border-black
            text-xl font-bold
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            hover:translate-x-[2px]
            hover:translate-y-[2px]
            active:shadow-none
            active:translate-x-[4px]
            active:translate-y-[4px]
            transition-all duration-100
          "
        >
          {isDancing ? "Stop Dancing" : "Let's Dance!"}
        </button>
      </div>
    </div>
  )
}