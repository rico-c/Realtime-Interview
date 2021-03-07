import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import './BigPlayer.scss';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const BigPlayer = (props: VideoPlayerProps) => {
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
    <div className="big-player">
      <i className="iconfont fullscreen-btn" onClick={() => props.setSize(false)}>&#xe9d9;</i>
      <div ref={container} className="video-player"></div>
    </div>
  );
}

export default BigPlayer;