import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '@/hooks/useAgora';
import { Button } from "antd";
import SmallPlayer from '@/components/interview/SmallPlayer';
import BigPlayer from '@/components/interview/BigPlayer';
import Draggable from 'react-draggable';
import './videoCall.scss';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

const VideoCall = () => {
  const [isJoined, setisJoined] = useState(false);
  const [videoBigSize, setSize] = useState(true);
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);
  const myName = useSelector(state => (state as any).accout.name);
  const agoraCofig = {
    appId: "3df1d4e0372c4892a380fe3399f49e2d",
    channel: "ChannelTest123",
    token:
      "0063df1d4e0372c4892a380fe3399f49e2dIABesZPkYh+7/+acPxk4SD8GGOfAizYYVbt+chWDSS8d7QI+3fUAAAAAEADqgOQ9/fBEYAEAAQD98ERg"
  };

  const handleJoin = useCallback(
    () => {
      join(agoraCofig.appId, agoraCofig.channel, agoraCofig.token, myName)
      setisJoined(true)
    },
    []
  )

  const handleLeave = useCallback(
    () => {
      leave()
      setisJoined(false)
    },
    []
  )

  return (
    <div className='video-call'>
      <Button onClick={isJoined ? handleLeave : handleJoin}>
        {isJoined ? "退出通话" : "开始通话"}
      </Button>
      {
        isJoined && <div className='player-container'>
          {
            videoBigSize
              ? <Draggable>
                <BigPlayer videoTrack={localVideoTrack} audioTrack={undefined} setSize={setSize}></BigPlayer>
              </Draggable>
              : <Draggable>
                <SmallPlayer videoTrack={localVideoTrack} audioTrack={undefined} setSize={setSize}></SmallPlayer>
              </Draggable>
          }

          {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <Draggable>
              <SmallPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack} setSize={setSize}></SmallPlayer>
            </Draggable>
          </div>))}
        </div>
      }
    </div >
  );
}

export default VideoCall;
