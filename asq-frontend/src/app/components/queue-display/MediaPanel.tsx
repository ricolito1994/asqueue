import { useState, useEffect } from "react"

interface MediaPanelProps {
  pathToMedia: string
  textToAnnounce: string[]
}

const MediaPanel: React.FC <MediaPanelProps> = ({ pathToMedia, textToAnnounce }): React.ReactElement => {

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-full flex flex-col gap-4 pr-6">
      {/* Header with time */}
      <div className="rounded-2xl bg-card border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-4xl font-bold text-foreground mt-1 tabular-nums">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Video/Media area */}
      <div className="flex-1 rounded-2xl bg-card border border-border overflow-hidden relative">

        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={pathToMedia} type="video/mp4" />
        </video>
       
      </div>

      {/* Announcement bar */}
      <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>

          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-medium text-primary mb-1">
              Announcements
            </p>

            <div className="relative w-full overflow-hidden">
              <div className="flex w-max animate-marquee gap-16">

                {[...textToAnnounce, ...textToAnnounce].map((text, index) => (
                  <span
                    key={index}
                    className="text-md text-muted-foreground tracking-wide"
                  >
                    📢 {text}
                  </span>
                ))}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MediaPanel;
