import { useState, useEffect } from "react"

export default function VariableTypePlayground() {
  // Animation constants
  const WAVE_SPEED = 0.2 // Speed of the wave animation in units per second
  const WAVE_SHARPNESS = 8 // Controls how sharp the peak of the wave is
  const BASE_WEIGHT = 300 // Base font weight (thinnest)
  const MAX_WEIGHT = 950 // Maximum font weight (boldest)
  const WEIGHT_RANGE = MAX_WEIGHT - BASE_WEIGHT // Range of weight variation
  
  // Color constants
  const BASE_COLOR = { r: 0, g: 0, b: 50 } // Dark blue
  const HIGHLIGHT_COLOR = { r: 0, g: 200, b: 255 } // Bright cyan
  
  // Font settings
  const opticalSize = 24
  
  // Text content
  const visibleText = "Variable Typographia"
  // Add invisible characters at the beginning and end for smooth transitions
  // These create a seamless loop when the wave wraps around
  const paddingChars = "••••••••••" // 10 invisible characters
  const text = paddingChars + visibleText + paddingChars

  const [wavePosition, setWavePosition] = useState(0)

  // Wave animation for individual letters
  const getLetterStyle = (index: number) => {
    // Calculate the relative position of the letter in the text (0 to 1)
    const letterPosition = index / (text.length - 1)
    
    // Calculate the distance from the wave position to this letter
    // We want the wave to wrap around, so we use modulo 1
    const distance = Math.abs((letterPosition - wavePosition) % 1)
    
    // Create a sharper peak using a modified Gaussian-like function
    const waveIntensity = Math.exp((-((distance * WAVE_SHARPNESS) ** 2)))
    
    // Calculate the weight for this letter
    const letterWeight = Math.round(BASE_WEIGHT + waveIntensity * WEIGHT_RANGE)
    
    // Keep optical size constant during wave animation
    const letterOpticalSize = opticalSize

    // Calculate color based on wave intensity
    // Interpolate between base and highlight colors based on wave intensity
    const r = Math.round(BASE_COLOR.r + (HIGHLIGHT_COLOR.r - BASE_COLOR.r) * waveIntensity)
    const g = Math.round(BASE_COLOR.g + (HIGHLIGHT_COLOR.g - BASE_COLOR.g) * waveIntensity)
    const b = Math.round(BASE_COLOR.b + (HIGHLIGHT_COLOR.b - BASE_COLOR.b) * waveIntensity)
    
    const color = `rgb(${r}, ${g}, ${b})`

    return {
      display: 'inline-block',
      fontVariationSettings: `"wght" ${letterWeight}, "opsz" ${letterOpticalSize}`,
      color: color,
    }
  }

  // Wave animation effect
  useEffect(() => {
    let waveFrame: number
    let lastTime = 0

    const animate = (currentTime: number) => {
      // Calculate delta time in seconds
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Move the wave position
      setWavePosition(prev => (prev + deltaTime * WAVE_SPEED) % 1)
      
      waveFrame = requestAnimationFrame(animate)
    }
    waveFrame = requestAnimationFrame(animate)

    return () => {
      if (waveFrame) {
        cancelAnimationFrame(waveFrame)
      }
    }
  }, [])

  // Split text into visible and padding parts
  const visibleParts = visibleText.split(' ')
  const paddingLength = paddingChars.length

  return (
    <div className="flex flex-col items-center justify-center p-[5vw]">
      <h1 className="text-[11vw]/[13vw]">
        {/* Start padding - invisible characters for smooth transition */}
        <span className="sr-only">
          {paddingChars.split('').map((char, index) => (
            <span
              key={`start-${index}`}
              style={getLetterStyle(index)}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </span>
        
        {/* Visible text */}
        {visibleParts.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block">
            {word.split('').map((letter, letterIndex) => {
              const absoluteIndex = paddingLength + visibleParts.slice(0, wordIndex).join(' ').length + letterIndex
              return (
                <span
                  key={`letter-${wordIndex}-${letterIndex}`}
                  style={getLetterStyle(absoluteIndex)}
                  className="inline-block"
                >
                  {letter}
                </span>
              )
            })}
            {wordIndex < visibleParts.length - 1 && ' '}
          </span>
        ))}
        
        {/* End padding - invisible characters for smooth transition */}
        <span className="sr-only">
          {paddingChars.split('').map((char, index) => {
            const absoluteIndex = paddingLength + visibleText.length + index
            return (
              <span
                key={`end-${index}`}
                style={getLetterStyle(absoluteIndex)}
                className="inline-block"
              >
                {char}
              </span>
            )
          })}
        </span>
      </h1>
    </div>
  )
}