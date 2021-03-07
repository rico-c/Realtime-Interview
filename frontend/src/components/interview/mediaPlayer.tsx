import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack ?.play(container.current);
    return () => {
      props.videoTrack ?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    props.audioTrack ?.play();
    return () => {
      props.audioTrack ?.stop();
    };
  }, [props.audioTrack]);
  return (
    <div>
      <div ref={container} className="video-player" style={{ width: "240px", height: "150px" }}></div>
      <div>buttons</div>
    </div>
  );
}

export default MediaPlayer;