"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface VideoWithLoaderProps {
    src: string
    poster: string
    className?: string
    videoClassName?: string
}

export function VideoWithLoader({ src, poster, className, videoClassName }: VideoWithLoaderProps) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <div className={cn("relative w-full overflow-hidden bg-gray-100", className)}>
            {/* 
        Placeholder Image 
        We use 'fill' to cover the container. 
        The container's height is determined by the video (when relative) or min-height.
      */}
            <div
                className={cn(
                    "absolute inset-0 z-10 transition-opacity duration-700 ease-in-out",
                    isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
            >
                <Image
                    src={poster}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover blur-sm scale-110" // Optional: blur for loader effect
                    priority
                />
                {/* Simple Spinner */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            </div>

            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={() => setIsVideoLoaded(true)}
                className={cn(
                    "w-full h-auto object-cover transition-opacity duration-700",
                    videoClassName,
                    isVideoLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{ minHeight: "450px" }} // Force a minimum height to prevent collapse before load
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    )
}
