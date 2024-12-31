import { useEffect } from 'react';
import Hls from 'hls.js';

export const useHls = (
  url: string,
  videoRef: React.RefObject<HTMLVideoElement>,
  muted: boolean,
) => {
  useEffect(() => {
    if (!videoRef.current || !Hls.isSupported()) return;

    const video = videoRef.current;
    const hls = new Hls();

    const attemptPlay = async () => {
      try {
        if (!muted) {
          // 이전에 상호작용이 있었던 경우
          video.muted = muted;
          await video.play();
        } else {
          // 처음 방문하는 경우
          video.muted = muted; // 일단 음소거로 시작
          await video.pause();
        }
      } catch (error) {
        console.log('자동재생 실패:', error);
      }
    };

    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, attemptPlay);

    return () => {
      hls.destroy();
    };
  }, [muted]);
};
