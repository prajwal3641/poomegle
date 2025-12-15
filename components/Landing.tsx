"use client"
import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Landing = () => {
    const [name, setName] = useState("")
    const [joined, setJoined] = useState(false)
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null)
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const getCam = async () => {
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            const audioTrack = stream.getAudioTracks()[0]
            const videoTrack = stream.getVideoTracks()[0]
            setLocalAudioTrack(audioTrack)
            setLocalVideoTrack(videoTrack)
            if (videoRef.current) {
                videoRef.current.srcObject = new MediaStream([videoTrack])
            }
            setIsLoading(false)
        } catch (err) {
            console.error("Camera error:", err)
            setError("Camera access denied")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            getCam()
        }
    }, [])

    if (!joined) {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <h1 className="text-2xl font-semibold mb-6">poomegle</h1>
                <p className="text-base text-muted-foreground mb-6">Talk to strangers</p>
                
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                    <div className="relative rounded-lg overflow-hidden bg-muted">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                                <p className="text-base text-muted-foreground">Loading camera...</p>
                            </div>
                        )}
                        {error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                                <p className="text-base text-muted-foreground">{error}</p>
                            </div>
                        )}
                        <video 
                            autoPlay 
                            muted
                            playsInline
                            ref={videoRef} 
                            className="w-full aspect-video object-cover"
                        />
                    </div>
                    <p className="text-base text-muted-foreground text-center mt-2">You</p>
                </div>
                
                <div className="flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 gap-2">
                    <Input 
                        className="flex-1 text-base" 
                        type="text" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && name.trim() && !error && setJoined(true)}
                    />
                    <Button 
                        className="text-base"
                        onClick={() => setJoined(true)}
                        disabled={!name.trim() || !!error}
                    >
                        Join
                    </Button>
                </div>
                
                <p className="text-base text-muted-foreground mt-6">Be respectful</p>
            </div>
        )
    }
    
    return (
        <Room 
            name={name} 
            localAudioTrack={localAudioTrack} 
            localVideoTrack={localVideoTrack}
        />
    )
}
