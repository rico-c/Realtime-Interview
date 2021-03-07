import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import './SmallPlayer.scss';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const SmallPlayer = (props: VideoPlayerProps) => {
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
    <div className="small-player">
      <i className="iconfont fullscreen-btn" onClick={() => props.setSize(true)}>&#xe9db;</i>
      <div ref={container} className="video-player" style={{ width: "240px", height: "150px" }}></div>
      <div className="bottom-bar">

      </div>
    </div>
  );
}

export default SmallPlayer;