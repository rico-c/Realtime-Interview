import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '@/hooks/useAgora';
import { Button } from 'antd';
import SmallPlayer from '@/components/interview/SmallPlayer';
import BigPlayer from '@/components/interview/BigPlayer';
import Draggable from 'react-draggable';
import { PhoneOutlined } from '@ant-design/icons';
import './videoCall.scss';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

const VideoCall = () => {
  const [isJoined, setisJoined] = useState(false);
  const [videoBigSize, setSize] = useState(true);
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers
  } = useAgora(client);
  const myName = useSelector(state => (state as any).accout.name);
  
  const agoraCofig = {
    appId: '3df1d4e0372c4892a380fe3399f49e2d',
    channel: 'testchannel',
    token:
      '0063df1d4e0372c4892a380fe3399f49e2dIACu/7XOgra+eU1YKnx/CsxMrr7rZ0cr+6ILtYD3Q6Y4mupuE8wAAAAAEADkBngOR0tEYQEAAQBGS0Rh'
  };

  const handleJoin = useCallback(() => {
    join(agoraCofig.appId, agoraCofig.channel, agoraCofig.token, 1);
    setisJoined(true);
  }, []);

  const handleLeave = useCallback(() => {
    leave();
    setisJoined(false);
  }, []);

  return (
    <div className="video-call">
      {isJoined ? (
        <Button onClick={handleLeave}>退出通话</Button>
      ) : (
        <Button className="make-call" onClick={handleJoin} type="primary" icon={<PhoneOutlined />}>开始通话</Button>
      )}
      {isJoined && (
        <div className="player-container">
          {videoBigSize ? (
            <Draggable key="big">
              <div className="big-v">
                <BigPlayer
                  videoTrack={localVideoTrack}
                  audioTrack={localAudioTrack}
                  setSize={setSize}
                  leave={handleLeave}
                ></BigPlayer>
              </div>
            </Draggable>
          ) : (
            <Draggable key="small">
              <div className="small-v">
                <SmallPlayer
                  videoTrack={localVideoTrack}
                  audioTrack={localAudioTrack}
                  setSize={setSize}
                ></SmallPlayer>
              </div>
            </Draggable>
          )}

          {remoteUsers.map(user => (
            <div className="remote-player-wrapper" key={user.uid}>
              <Draggable>
                <div>
                  <SmallPlayer
                    videoTrack={user.videoTrack}
                    audioTrack={user.audioTrack}
                    setSize={setSize}
                  ></SmallPlayer>
                </div>
              </Draggable>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCall;
