"use client"
import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Landing = () => {
    const [name,setName]=useState("")
    const [joined, setJoined]=useState(false)
    const [localAudioTrack, setLocalAudioTrack]=useState<MediaStreamTrack|null>(null)
    const [localVideoTrack, setLocalVideoTrack]=useState<MediaStreamTrack|null>(null)
    const videoRef =useRef<HTMLVideoElement|null>(null)

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if(!joined){
        
        return (
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                    <video autoPlay ref={videoRef} className="w-full rounded-lg grayscale"></video> 
                </div>
                <div className="flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md mt-4">
                    <Input className="mx-1 flex-1" type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
                    <Button className="mx-1" onClick={()=>{setJoined(true)}}>Join</Button>
                </div>
            </div>
        );
    }
    return(<Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack}/>)


    
};