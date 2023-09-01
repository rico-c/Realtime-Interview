import React, { useState, useCallback, useEffect } from 'react';
import useAgora from 'hooks/useAgora';
import { Button, Popover,message } from 'antd';
import SmallPlayer from 'components/interview/SmallPlayer';
import BigPlayer from 'components/interview/BigPlayer';
import Draggable from 'react-draggable';
import { PhoneOutlined } from '@ant-design/icons';
import './videoCall.scss';
import { useUserInfo } from 'hooks/useLogin';

const VideoCall = (props: { socket: any; roomId: string }) => {
  const { socket, roomId } = props;
  const [isJoined, setisJoined] = useState(false);
  const [videoBigSize, setSize] = useState('me');
  const [videoJoiner, setVideoJoiner] = useState<string | null | undefined>(null);
  const { name } = useUserInfo();
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    shareScreen,
    closeShareScreen,
    localScreenTrack
  } = useAgora(roomId);

  const handleJoin = useCallback(() => {
    join();
    setisJoined(true);
    socket?.emit('joinchat', name);
    setVideoJoiner(null);
    setTimeout(() => {
      message.warning('系统超时，请重新开启视频通话')
      leave();
    }, 1000 * 60 * 60 * 5);
  }, [socket, name, join,leave]);

  const handleLeave = useCallback(async () => {
    await leave();
    setisJoined(false);
  }, [leave]);

  const doCloseShareScreen = () => {
    if (localScreenTrack) {
      localScreenTrack.stop();
      localScreenTrack.close();
    }
    closeShareScreen();
  }

  useEffect(() => {
    return () => {
      if (!window.location.pathname.includes('/interview')) {
        leave();
      }
    }
  }, [localVideoTrack, localAudioTrack])

  useEffect(() => {
    socket?.on('newchatjoiner', name => {
      setVideoJoiner(name);
    })
  }, [socket])

  return (
    <div className="video-call">
      {isJoined ? (
        <Button onClick={handleLeave} ghost>退出通话</Button>
      ) : (
        <Popover
          content={`${videoJoiner}已开启视频通话，点击加入`}
          placement="bottom"
          visible={!!videoJoiner && !joinState}
        >
          <Button className="make-call" ghost onClick={handleJoin} icon={<PhoneOutlined />}>开启视频通话</Button>
        </Popover>
      )}
      {isJoined && (
        <div className="player-container">
          {videoBigSize === 'me' ? (
            <Draggable key="big">
              <div className="big-v">
                <BigPlayer
                  videoTrack={localVideoTrack}
                  audioTrack={localAudioTrack}
                  setSize={setSize}
                  leave={handleLeave}
                  shareScreen={shareScreen}
                  closeShareScreen={doCloseShareScreen}
                  name="我"
                  id="me"
                  isme={true}
                ></BigPlayer>
              </div>
            </Draggable>
          ) : (
            <div className="small-v">
              <SmallPlayer
                videoTrack={localVideoTrack}
                audioTrack={localAudioTrack}
                setSize={setSize}
                name="我"
                id="me"
                isme={true}
              ></SmallPlayer>
            </div>
          )}

          {remoteUsers.map(user => (
            <div className="remote-player-wrapper" key={user.uid}>
              {
                videoBigSize === user.uid ?
                  <Draggable>
                    <div className="big-v">
                      <BigPlayer
                        videoTrack={user.videoTrack}
                        audioTrack={user.audioTrack}
                        setSize={setSize}
                        isme={false}
                        name={user.uid}
                        id={user.uid}
                      ></BigPlayer>
                    </div>
                  </Draggable> :
                  <div className="small-v">
                    <SmallPlayer
                      videoTrack={user.videoTrack}
                      audioTrack={user.audioTrack}
                      setSize={setSize}
                      name={user.uid}
                      isme={false}
                      id={user.uid}
                    ></SmallPlayer>
                  </div>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCall;
