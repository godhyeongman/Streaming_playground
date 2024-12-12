'use client';
import { useRef, useState, useEffect } from 'react';

export default function Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0); // 비디오 전체 길이
  const [playVideo, setPlayVideo] = useState(false);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      console.log(`Current Time: ${currentTime.toFixed(2)} seconds`);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const buffered = videoRef.current.buffered;
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1); // 버퍼링된 마지막 위치
        console.log(`Buffered Time: ${bufferedEnd.toFixed(2)} seconds`);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      // 비디오가 로드될 때 전체 길이 설정
      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          const duration = videoRef.current.duration;
          setDuration(duration);
          console.log(`Video Duration: ${duration.toFixed(2)} seconds`);
        }
      };

      // 이벤트 리스너 추가
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.addEventListener('progress', handleProgress); // 버퍼링 업데이트

      // 클린업 함수로 이벤트 리스너 제거
      return () => {
        videoRef.current?.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata,
        );
        videoRef.current?.removeEventListener('progress', handleProgress);
      };
    }
  }, []);

  const handleClick = () => {
    const toggledPlay = !playVideo;
    setPlayVideo(toggledPlay);

    if (toggledPlay) {
      videoRef.current.play();
      return;
    }

    if (!toggledPlay) {
      videoRef.current.pause();
    }
  };
  return (
    <div>
      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onTimeUpdate={handleTimeUpdate} // 현재 재생 시간 업데이트
        onClick={handleClick}
      ></video>
      <p>Duration: {duration.toFixed(2)} seconds</p>
    </div>
  );
}
