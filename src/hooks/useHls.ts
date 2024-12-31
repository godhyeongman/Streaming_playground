import { useEffect } from 'react';
import Hls from 'hls.js';

export const useHls = (
  url: string,
  videoRef: React.RefObject<HTMLVideoElement>,
) => {
  useEffect(() => {
    if (!videoRef.current || !Hls.isSupported()) return;

    const video = videoRef.current;
    const hls = new Hls();

    const attemptPlay = async () => {
      try {
        await video.play();
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
  }, []);
};
