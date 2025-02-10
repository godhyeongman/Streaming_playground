import { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';
import type { ManifestParsedData, Level, LevelSwitchedData } from 'hls.js';

export const useHls = (
  url: string,
  videoRef: React.RefObject<HTMLVideoElement>,
) => {
  const [levels, setLevels] = useState<Level[] | LevelSwitchedData>([]);
  const [currentBitrate, setCurrentBitrate] = useState(-1);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current || !Hls.isSupported()) return;

    const video = videoRef.current;
    const hls = new Hls();

    hlsRef.current = hls;
    const attemptPlay = async (_: unknown, data: ManifestParsedData) => {
      try {
        await video.play();
        setLevels(data.levels);
      } catch (error) {
        console.log('자동재생 실패:', error);
      }
    };

    hls.loadSource(url);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, attemptPlay);

    hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
      setCurrentBitrate(data.level);
    });

    return () => {
      hls.destroy();
    };
  }, []);

  const changeBitrate = (bitrate: number) => {
    if (!hlsRef.current) return;

    hlsRef.current.currentLevel = bitrate; // -1: 자동, 0~n: 특정 품질
    setCurrentBitrate(bitrate);
  };

  return { bitrate: currentBitrate, changeBitrate, levels };
};
