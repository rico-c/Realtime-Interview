import { useState, useEffect, useMemo } from "react";
import AgoraRTC, {
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from "agora-rtc-sdk-ng";

const agoraCofig = {
  appId: "3df1d4e0372c4892a380fe3399f49e2d",
  channel: "test",
  token:
    "0063df1d4e0372c4892a380fe3399f49e2dIAADFACCNOZekVO/GTbmi1NBDS41ZB70z1NGuji3JA0Qiwx+f9gAAAAAEAANfVS+dlNlYQEAAQB2U2Vh",
};

const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
let shareScreenClent = null;

export default function useAgora(username : string): {
  localAudioTrack: ILocalAudioTrack | undefined;
  localVideoTrack: ILocalVideoTrack | undefined;
  localScreenTrack: any;
  closeShareScreen: Function;
  joinState: boolean;
  leave: Function;
  join: Function;
  shareScreen: Function;
  remoteUsers: IAgoraRTCRemoteUser[];
} {
  const [localVideoTrack, setLocalVideoTrack] = useState<
    ILocalVideoTrack | undefined
  >(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);
  const [localScreenTrack, setLocalScreenTrack] = useState(undefined);

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const audioConfig = useMemo(() => {
    return {
      AEC: true, //是否开启回声消除
      AGC: true, //是否开启自动增益
      ANS: true, //是否开启噪声抑制
    };
  }, []);

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    const [microphoneTrack, cameraTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function join() {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks(audioConfig);

    await client.join(
      agoraCofig.appId,
      agoraCofig.channel,
      agoraCofig.token || null,
      encodeURI(username)
    );
    await client.publish([microphoneTrack, cameraTrack]);

    (window as any).client = client;
    (window as any).videoTrack = cameraTrack;

    setJoinState(true);
  }

  async function leave() {
    // if (localAudioTrack) {
    //   localAudioTrack.stop();
    //   localAudioTrack.close();
    // }
    // if (localVideoTrack) {
    //   localVideoTrack.stop();
    //   localVideoTrack.close();
    // }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  /**
   * 新增共享屏幕
   * @returns
   */
  async function shareScreen() {
    shareScreenClent = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    shareScreenClent.join(
      agoraCofig.appId,
      agoraCofig.channel,
      agoraCofig.token || null,
      encodeURI(`${username}共享屏幕`)
    );
    const videoTrack = await AgoraRTC.createScreenVideoTrack({}, "disable");
    shareScreenClent.publish(videoTrack);
    setLocalScreenTrack(videoTrack);
  }

  /**
   * 关闭共享屏幕
   * @returns
   */
  async function closeShareScreen() {
    if (localScreenTrack) {
      localScreenTrack.stop();
      localScreenTrack.close();
    }
    await shareScreenClent?.leave();
    shareScreenClent = null;
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    localScreenTrack,
    joinState,
    leave,
    join,
    remoteUsers,
    shareScreen,
    closeShareScreen,
  };
}
