import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Tooltip, Drawer } from 'antd';
import { QuestionCircleOutlined} from '@ant-design/icons'
import markdown from 'markdown-it';
import './BigPlayer.scss';

const markdownHTML = markdown.render(`
  请按以下步骤检查：

  - 当前网站链接是否使用 HTTPS 协议，HTTP会导致视频通话无法工作。
  - 检查你的麦克风和摄像头是否正常工作。
  - 检查是否已授予对应的摄像头或麦克风权限。
  - 尽管用户已经授权使用相应的设备，操作系统、浏览器或者网页层面发生的硬件错误导致该设备无法被访问。你可以尝试刷新页面或者更新设备驱动。部分 Windows 10 笔记本电脑上使用 Chrome 浏览器时，需要以兼容 Windows 7 的模式运行 Chrome 才能使用摄像头。
  - 如仍无法正常工作，建议您使用其他平台进行视频通话，realtime interview仅作为代码考察功能使用，抱歉给您的面试带来不便。
`)

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
  const [drawervisible, setDrawervisible] = useState<boolean>(false);

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
  }, [props.audioTrack])

  const videoSwitch = useCallback((value) => {
    props.videoTrack && props.videoTrack.setEnabled(value);
    setVideo(value);
  }, [props.videoTrack])

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
        <span className="name c-font-big c-gap-left c-gap-inner-top">{decodeURI(String(props.name))}</span>
        <span className="question" onClick={_ => setDrawervisible(true)}><QuestionCircleOutlined /><span>无法开启视频？</span></span>
      </div>
      <div ref={container} className="video-player"></div>
      <div className="bottom-btns">
        {/* 缩放 */}
        <div className="player-btn">
          <Tooltip title="最小化">
            <i className="iconfont" onClick={() => props.setSize(false)}>&#xe617;</i>
          </Tooltip>
        </div>
        {/* 共享 */}
        {props.isme &&
          <div className="player-btn">

            {
              screen ? <Tooltip title="关闭共享屏幕"><i className="iconfont" onClick={_ => screenShareSwitch(false)}>&#xe618; </i></Tooltip> : <Tooltip title="共享屏幕"><i className="iconfont" onClick={_ => screenShareSwitch(true)}>&#xe618;</i></Tooltip>
            }

          </div>
        }
        {/* 挂断 */}
        {props.isme &&
          <div className="player-btn offcall">
            <i className="iconfont" onClick={props.leave}>&#xe616;</i>
          </div>
        }
        {/* 视频 */}
        {props.isme &&
          <div className="player-btn">
            {
              video ? <Tooltip title="摄像头：开"><i className="iconfont" onClick={() => videoSwitch(false)}>&#xe634;</i></Tooltip> : <Tooltip title="摄像头：关"><i className="iconfont" onClick={() => videoSwitch(true)}>&#xe632;</i></Tooltip>
            }
          </div>
        }
        {/* 静音 */}
        {props.isme &&
          <div className="player-btn">
            {
            mute ? <Tooltip title="麦克风：关"><i className="iconfont" onClick={() => muteSwitch(false)}>&#xe625; </i></Tooltip> : <Tooltip title="麦克风：开"><i className="iconfont" onClick={() => muteSwitch(true)}>&#xe626;</i></Tooltip>
            }
          </div>
        }
      </div>
      <Drawer
        placement="right"
        closable={true}
        visible={drawervisible}
        width="400"
        title="开启视频遇到问题？"
        onClose={() => setDrawervisible(false)}
      >
        <div dangerouslySetInnerHTML={{ __html: markdownHTML }} />
      </Drawer>
    </div>
  );
}

export default BigPlayer;