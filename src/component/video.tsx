'use client';
import { useRef, useState } from 'react';
import { useHls } from '@/src/hooks/useHls';
import PlayButton from '@/src/component/playButton';


type VideoProps = {
  url: string;
  width?: number;
  height?: number;
};
export default function Video({ url, width, height }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  useHls(url, videoRef);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    const toggledPlay = !playVideo;
    setPlayVideo(toggledPlay);

    if (toggledPlay) {
      video.play();
      return;
    }

    if (!toggledPlay) {
      video.pause();
    }
  };

  const handleMouseEnter = () => {
    setMouseHover(true);
  };

  const handleMouseLeave = () => {
    setMouseHover(false);
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {mouseHover && (
        <PlayButton
          size={100}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
