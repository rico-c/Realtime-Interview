import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '@/hooks/useAgora';
import { Button } from "antd";
import MediaPlayer from '@/components/interview/mediaPlayer';
import './videoCall.scss';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

const VideoCall = () => {
  const [isJoined, setisJoined] = useState(false);
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);
  const myName = useSelector(state => (state as any).accout.name);
  console.log('joinstate: ' + joinState);
  console.log(remoteUsers);
  console.log(localVideoTrack);
  console.log(localAudioTrack);
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
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
          <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
          <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
        </div>))}
      </div>
    </div>
  );
}

export default VideoCall;
