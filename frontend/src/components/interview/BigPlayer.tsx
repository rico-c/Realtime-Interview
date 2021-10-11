import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
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
      </div>
      <div ref={container} className="video-player"></div>
      <div className="bottom-btns">
        {/* 缩放 */}
        <div className="player-btn">
          <i className="iconfont" onClick={() => props.setSize(false)}>&#xe617;</i>
        </div>
        {/* 共享 */}
        <div className="player-btn">
          {
            screen ? <i className="iconfont" onClick={_ => screenShareSwitch(false)}>&#xe618; </i> : <i className="iconfont" onClick={_ => screenShareSwitch(true)}>&#xe618;</i>
          }
        </div>
        {/* 挂断 */}
        <div className="player-btn offcall">
          <i className="iconfont" onClick={props.leave}>&#xe616;</i>
        </div>
        {/* 视频 */}
        <div className="player-btn">
          {
            video ? <i className="iconfont" onClick={() => videoSwitch(false)}>&#xe634;</i> : <i className="iconfont" onClick={() => videoSwitch(true)}>&#xe632;</i>
          }
        </div>
        {/* 静音 */}
        <div className="player-btn">
          {
            mute ? <i className="iconfont" onClick={() => muteSwitch(false)}>&#xe625; </i> : <i className="iconfont" onClick={() => muteSwitch(true)}>&#xe626;</i>
          }
        </div>
      </div>
    </div>
  );
}

export default BigPlayer;