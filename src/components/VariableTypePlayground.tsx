import { useState, useEffect } from "react"

export default function VariableTypePlayground() {
  const [wavePosition, setWavePosition] = useState(0)
  const opticalSize = 24

  // Add invisible characters at the beginning and end for smooth transitions
  const visibleText = "Variable Typographia"
  const paddingChars = "••••••••••" // 10 invisible characters
  const text = paddingChars + visibleText + paddingChars

  // Wave animation for individual letters
  const getLetterStyle = (index: number) => {
    // Calculate the relative position of the letter in the text (0 to 1)
    const letterPosition = index / (text.length - 1)
    
    // Calculate the distance from the wave position to this letter
    // We want the wave to wrap around, so we use modulo 1
    const distance = Math.abs((letterPosition - wavePosition) % 1)
    
    // Create a sharper peak using a modified Gaussian-like function
    // Increase the multiplier (from 5 to 8) to make the peak sharper
    const waveIntensity = Math.exp((-((distance * 8) ** 2)))
    
    // Calculate the weight for this letter
    // Increase the contrast by lowering the base weight and increasing the max weight
    // Base weight is 300 (was 400), max weight is 950 (was 900)
    const letterWeight = Math.round(300 + waveIntensity * 650)
    
    // Keep optical size constant during wave animation
    const letterOpticalSize = opticalSize

    return {
      display: 'inline-block',
      fontVariationSettings: `"wght" ${letterWeight}, "opsz" ${letterOpticalSize}`,
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
      // Adjust the speed by changing the multiplier (currently 0.2)
      setWavePosition(prev => (prev + deltaTime * 0.2) % 1)
      
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
    <div className="flex flex-col items-center justify-center p-[5vw] min-h-screen overflow-auto">
        <h1 className="text-[10vw]/[12vw] mb-12">
        {/* Start padding */}
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
        
        {/* End padding */}
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