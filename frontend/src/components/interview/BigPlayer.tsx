import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import { Button } from 'antd';
import React, { useRef, useEffect, useState, useCallback } from "react";
import './BigPlayer.scss';

export interface VideoPlayerProps {
  videoTrack?: ILocalVideoTrack | IRemoteVideoTrack | undefined | any;
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  shareScreen?: any;
  closeShareScreen?: any
  setSize: any;
  leave?: any;
  isme: boolean;
  name: string;
  id: string | number;
}

const BigPlayer = (props: VideoPlayerProps) => {

  const container = useRef<HTMLDivElement>(null);

  const [mute, setMute] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(true);
  const [screen, setScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);

  useEffect(() => {
    if (!props.isme) {
      props.audioTrack?.play();
      return () => {
        props.audioTrack?.stop();
      }
    }
  }, [props.audioTrack, props.isme]);

  const muteSwitch = useCallback((value) => {
    const volume = value ? 0 : 100;
    props.audioTrack && props.audioTrack.setVolume(volume);
    setMute(value);
  }, [])

  const videoSwitch = useCallback((value) => {
    props.videoTrack && props.videoTrack.setEnabled(value);
    setVideo(value);
  }, [])

  const screenShareSwitch = (value: boolean) => {
    if (value) {
      props.shareScreen();
    } else {
      props.closeShareScreen();
    }
    setScreen(value)
  }

  return (
    <div className="big-player">
      <div className="top-info">
        <span className="c-font-big c-gap-left c-gap-inner-top">{decodeURI(String(props.name))}</span>
        <i className="iconfont fullscreen-btn" onClick={() => props.setSize(false)}>&#xe9d9;</i>
      </div>
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
          {
            screen ? <Button icon={<i className="iconfont">&#xe618;</i>} onClick={_ => screenShareSwitch(false)}>停止屏幕共享</Button> : <Button icon={<i className="iconfont">&#xe618;</i>} onClick={_ => screenShareSwitch(true)}>屏幕共享</Button>
          }
        </div>
        <div>
          <Button icon={<i className="iconfont">&#xe616;</i>} onClick={props.leave}>挂断</Button>
        </div>
      </div>
    </div>
  );
}

export default BigPlayer;