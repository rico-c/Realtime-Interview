import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { Button } from 'antd';
import React, { useRef, useEffect, useState, useCallback } from "react";
import './BigPlayer.scss';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const BigPlayer = (props: VideoPlayerProps) => {

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
    <div className="big-player">
      <i className="iconfont fullscreen-btn" onClick={() => props.setSize(false)}>&#xe9d9;</i>
      <div ref={container} className="video-player"></div>
      <div className="bottom-btns">
        <div>
          {
            video ? <Button icon={<i className="iconfont">&#xe634;</i>} onClick={() => videoSwitch(false)}>关闭</Button> : <Button icon={<i className="iconfont">&#xe632;</i>} onClick={() => videoSwitch(true)}>开启</Button>
          }
        </div>
        <div>
          {
            mute ? <Button icon={<i className="iconfont">&#xe625;</i>} onClick={() => muteSwitch(false)}>开启</Button> : <Button icon={<i className="iconfont">&#xe626;</i>} onClick={() => muteSwitch(true)}>关闭</Button>
          }
        </div>
        <div>
          <Button icon={<i className="iconfont">&#xe618;</i>}>屏幕共享</Button>
        </div>
        <div>
          <Button icon={<i className="iconfont">&#xe616;</i>} onClick={props.leave}>挂断</Button>
        </div>
      </div>
    </div>
  );
}

export default BigPlayer;