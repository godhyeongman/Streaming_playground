'use client';
import { useRef, useState } from 'react';
import { useHls } from '@/src/hooks/useHls';
import PlayButton from '@/src/component/playButton';
import { cn } from '@/lib/utils';
type VideoProps = {
  url: string;
  width?: number | string;
  height?: number | string;
};

export default function Video({
  url,
  width = 'w-full',
  height = 'h-full',
}: VideoProps) {
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
    <div className={cn(width, height)}>
      <video
        className="w-full h-full object-contain"
        ref={videoRef}
        autoPlay
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '100%' }}
      />
      {mouseHover && (
        <PlayButton
          size={100}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
