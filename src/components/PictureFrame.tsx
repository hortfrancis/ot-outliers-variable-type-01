export default function PictureFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen">
      {/* Outer frame with gradient background */}

      {/* Metallic border layer */}
      <div className="
          h-full
          border-[2.5vw]
          border-[#2d2d2d]
          bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#2193b0]
          shadow-inner
        ">
        {/* Inner frame */}
        <div className="
            h-full
            border-[2.5vw]
            border-white
            bg-gradient-to-br from-[#ff00cc] via-[#4ecdc4] to-[#002aff]
            p-[2.5vw]
            backdrop-blur-sm
          ">
          {/* Content area with glass effect */}
          <div className="
              bg-white/90 
              h-full 
              relative
              backdrop-blur-md
              shadow-inner
              overflow-hidden
            ">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
