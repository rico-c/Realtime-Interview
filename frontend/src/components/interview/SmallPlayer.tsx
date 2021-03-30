import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from 'antd';
import './SmallPlayer.scss';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | any;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | any;
  setSize: any;
}

const SmallPlayer = (props: VideoPlayerProps) => {

  const container = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(true);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack ?.play(container.current);
    return () => {
      props.videoTrack ?.stop();
    };
  }, [container, props.videoTrack]);

  // useEffect(() => {
  //   props.audioTrack ?.play();
  //   return () => {
  //     props.audioTrack ?.stop();
  //   };
  // }, [props.audioTrack]);

  const muteSwitch = useCallback((value) => {
    const volume = value ? 0 : 100;
    props.audioTrack ?.setVolume(volume);
    setMute(value);
  }, [])

  const videoSwitch = useCallback((value) => {
    props.videoTrack ?.setEnabled(value);
    setVideo(value);
  }, [])

  return (
    <div className="small-player">
      <i className="iconfont fullscreen-btn" onClick={() => props.setSize(true)}>&#xe9db;</i>
      <div ref={container} className="video-player" style={{ width: "240px", height: "150px" }}></div>
      <div className="bottom-btns">
        <div>
          {
            video ? <Button icon={<i className="iconfont">&#xe634;</i>} onClick={() => videoSwitch(false)}></Button> : <Button icon={<i className="iconfont">&#xe632;</i>} onClick={() => videoSwitch(true)}></Button>
          }
        </div>
        <div>
          {
            mute ? <Button icon={<i className="iconfont">&#xe625;</i>} onClick={() => muteSwitch(false)}></Button> : <Button icon={<i className="iconfont">&#xe626;</i>} onClick={() => muteSwitch(true)}></Button>
          }
        </div>
      </div>
    </div>
  );
}

export default SmallPlayer;