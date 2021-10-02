import React, { useState, useCallback, useEffect } from 'react';
import useAgora from '@/hooks/useAgora';
import { Button } from 'antd';
import SmallPlayer from '@/components/interview/SmallPlayer';
import BigPlayer from '@/components/interview/BigPlayer';
import Draggable from 'react-draggable';
import { PhoneOutlined } from '@ant-design/icons';
import './videoCall.scss';

const VideoCall = () => {
  const [isJoined, setisJoined] = useState(false);
  const [videoBigSize, setSize] = useState('me');
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    shareScreen,
    closeShareScreen
  } = useAgora();

  const handleJoin = useCallback(() => {
    join(1);
    setisJoined(true);
  }, []);

  const handleLeave = useCallback(() => {
    leave();
    setisJoined(false);
  }, []);

  useEffect(() => {
    console.log(remoteUsers);
  }, [remoteUsers])

  return (
    <div className="video-call">
      {isJoined ? (
        <Button onClick={handleLeave}>退出通话</Button>
      ) : (
        <Button className="make-call" onClick={handleJoin} type="primary" icon={<PhoneOutlined />}>开始通话</Button>
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
                  closeShareScreen={closeShareScreen}
                  id="me"
                  isme={true}
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
                  id="me"
                  isme={true}
                ></SmallPlayer>
              </div>
            </Draggable>
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
                        id={user.uid}
                      ></BigPlayer>
                    </div>
                  </Draggable> : <Draggable>
                    <div>
                      <SmallPlayer
                        videoTrack={user.videoTrack}
                        audioTrack={user.audioTrack}
                        setSize={setSize}
                        isme={false}
                        id={user.uid}
                      ></SmallPlayer>
                    </div>
                  </Draggable>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCall;
