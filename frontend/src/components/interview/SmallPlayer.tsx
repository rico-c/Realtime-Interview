import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from 'antd';
import './SmallPlayer.scss';

export interface VideoPlayerProps {
  videoTrack?: ILocalVideoTrack | IRemoteVideoTrack | any;
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack | any;
  setSize: any;
  isme: boolean;
  name: string | number;
  id: string | number;
}

const SmallPlayer = (props: VideoPlayerProps) => {

  const container = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(true);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    console.log(props.videoTrack);
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
    props.audioTrack?.setVolume(volume);
    setMute(value);
  }, [props.audioTrack])

  const videoSwitch = useCallback((value) => {
    props.videoTrack?.setEnabled(value);
    setVideo(value);
  }, [props.videoTrack])

  return (
    <div className="small-player">
      <div className="top-info">
        <span>{decodeURI(String(props.name))}</span>
      </div>
      <div ref={container} className="video-player"></div>
      <div className="bottom-btns">
        <div className="player-btn">
          <i className="iconfont fullscreen-btn" onClick={() => props.setSize(props.id)}>&#xe619;</i>
        </div>
        {props.isme && <div className="player-btn">
          {
            video ? <i className="iconfont" onClick={() => videoSwitch(false)}>&#xe634;</i> : <i className="iconfont" onClick={() => videoSwitch(true)}>&#xe632;</i>
          }
        </div>}
        {props.isme && <div className="player-btn">
          {
            mute ? <i className="iconfont" onClick={() => muteSwitch(false)}>&#xe625;</i> : <i className="iconfont" onClick={() => muteSwitch(true)}>&#xe626;</i>
          }
        </div>}
      </div>
    </div>
  );
}

export default SmallPlayer;