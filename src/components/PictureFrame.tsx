export default function PictureFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0">
      {/* Outer frame with gradient background */}

      {/* Metallic border layer */}
      <div className="
          h-full
          border-[2.5vw]
          border-[#000032]
          bg-gradient-to-br from-[#000032] via-[#0066cc] to-[#00c8ff]
          shadow-inner
        ">
        {/* Inner frame */}
        <div className="
            h-full
            border-[2.5vw]
            border-[#d7f1f7]
            bg-gradient-to-br from-[#000032] via-[#0066cc] to-[#00c8ff]
            p-[2.5vw]
            backdrop-blur-sm
          ">
          {/* Content area with glass effect */}
          <div className="
              bg-[#d7f1f7]
              h-full 
              relative
              backdrop-blur-md
              shadow-inner
              flex
              items-center
              justify-center
            ">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
