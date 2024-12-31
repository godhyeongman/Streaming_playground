'use client';
import { useRef, useState } from 'react';
import { useHls } from '@/src/hooks/useHls';
import PlayButton from '@/src/component/playButton';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  useHls('http://localhost:8080/hls/1080/123123_1080p.m3u8', videoRef);

  // const [duration, setDuration] = useState(0); // 비디오 전체 길이

  // const handleTimeUpdate = () => {
  //   if (videoRef.current) {
  //     const currentTime = videoRef.current.currentTime;
  //     console.log(`Current Time: ${currentTime.toFixed(2)} seconds`);
  //   }
  // };

  // const handleProgress = () => {
  //   if (videoRef.current) {
  //     const buffered = videoRef.current.buffered;
  //     if (buffered.length > 0) {
  //       const bufferedEnd = buffered.end(buffered.length - 1); // 버퍼링된 마지막 위치
  //       console.log(`Buffered Time: ${bufferedEnd.toFixed(2)} seconds`);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (videoRef.current) {
  //     // 비디오가 로드될 때 전체 길이 설정
  //     const handleLoadedMetadata = () => {
  //       if (videoRef.current) {
  //         const duration = videoRef.current.duration;
  //         setDuration(duration);
  //         console.log(`Video Duration: ${duration.toFixed(2)} seconds`);
  //       }
  //     };

  //     // 이벤트 리스너 추가
  //     videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
  //     videoRef.current.addEventListener('progress', handleProgress); // 버퍼링 업데이트

  //     // 클린업 함수로 이벤트 리스너 제거
  //     return () => {
  //       videoRef.current?.removeEventListener(
  //         'loadedmetadata',
  //         handleLoadedMetadata,
  //       );
  //       videoRef.current?.removeEventListener('progress', handleProgress);
  //     };
  //   }
  // }, []);

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
        // onTimeUpdate={handleTimeUpdate} // 현재 재생 시간 업데이트
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute w-full h-full"
      ></video>
      {mouseHover && (
        <PlayButton
          size={100}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
