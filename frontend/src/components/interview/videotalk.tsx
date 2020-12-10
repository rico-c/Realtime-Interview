import React, { FC, useMemo, useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "@/utils/AgoraEnhancer";
import StreamPlayer from "agora-stream-player";
import { useCamera, useMicrophone, useMediaStream } from "@/hooks";
import { Button } from "antd";
import "./videotalk.scss";

// const { userId } = useParams<any>();
const defaultState = {
  appId: "3df1d4e0372c4892a380fe3399f49e2d",
  channel: "ChannelTest",
  uid: "rico",
  token:
    "0063df1d4e0372c4892a380fe3399f49e2dIADRHRlF3Fccds/712nbTq2cGZo0tOBdntJPNICPbC1uutuQH+4AAAAAEABID2UqwOu3XwEAAQDA67df",
  cameraId: "",
  microphoneId: "",
  mode: "rtc",
  codec: "h264"
};

const reducer = (
  state: typeof defaultState,
  action: { type: string; [propName: string]: any }
) => {
  switch (action.type) {
    default:
      return state;
    case "setAppId":
      return {
        ...state,
        appId: action.value
      };
    case "setChannel":
      return {
        ...state,
        channel: action.value
      };
    case "setUid":
      return {
        ...state,
        uid: action.value
      };
    case "setToken":
      return {
        ...state,
        token: action.value
      };
    case "setCamera":
      return {
        ...state,
        cameraId: action.value
      };
    case "setMicrophone":
      return {
        ...state,
        microphoneId: action.value
      };
    case "setMode":
      return {
        ...state,
        mode: action.value
      };
    case "setCodec":
      return {
        ...state,
        codec: action.value
      };
  }
};

const Videotalk: FC = () => {
  const [isJoined, setisJoined] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [agoraClient, setClient] = useState<any>(undefined);
  // const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const cameraList = useCamera();
  const microphoneList = useMicrophone();
  let [localStream, remoteStreamList, streamList] = useMediaStream(agoraClient);
  // const { enqueueSnackbar } = useSnackbar();

  const update = (actionType: string) => (e: React.ChangeEvent<unknown>) => {
    return dispatch({
      type: actionType,
      value: (e.target as HTMLInputElement).value
    });
  };
  const join = async () => {
    const client = AgoraRTC.createClient({
      mode: state.mode,
      codec: state.codec
    });
    setClient(client);
    setIsLoading(true);
    try {
      const uid = isNaN(Number(state.uid)) ? null : Number(state.uid);
      await client.init(state.appId);
      await client.join(state.token, state.channel, uid);
      const stream = AgoraRTC.createStream({
        streamID: uid || 12345,
        video: true,
        audio: true,
        screen: false
      });
      await stream.init();
      await client.publish(stream);
      setIsPublished(true);
      setisJoined(true);
      console.log(`Joined channel ${state.channel}`);
    } catch (err) {
      console.log(`Failed to join, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const publish = async () => {
    setIsLoading(true);
    try {
      if (localStream) {
        await agoraClient.publish(localStream);
        setIsPublished(true);
      }
      console.log("Stream published");
    } catch (err) {
      console.log(`Failed to publish`);
    } finally {
      setIsLoading(false);
    }
  };

  const leave = async () => {
    setIsLoading(true);
    try {
      if (localStream) {
        localStream.close();
        agoraClient.unpublish(localStream);
      }
      await agoraClient.leave();
      setIsPublished(false);
      setisJoined(false);
      console.log("Left channel");
    } catch (err) {
      console.log(`Failed to leave, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const unpublish = () => {
    if (localStream) {
      agoraClient.unpublish(localStream);
      setIsPublished(false);
      console.log("Stream unpublished");
    }
  };

  // useEffect(() => {
  //   join();
  //   publish();
  // }, [])

  return (
    <div className="video-talk">
      <Button onClick={isJoined ? leave : join} disabled={isLoading}>
        {isJoined ? "Leave" : "Join"}
      </Button>
      <h4>Local video</h4>
      <div id="me">
        {localStream && (
          <StreamPlayer
            stream={localStream}
            fit="contain"
            label="local"
            video={true}
            audio={true}
          />
        )}
      </div>
      <h4>Remote video </h4>
      <div id="remote-container">
        {remoteStreamList.map((stream: any) => (
          <StreamPlayer
            key={stream.getId()}
            stream={stream}
            fit="contain"
            label={"label"}
            video={true}
            audio={true}
            networkDetect={true}
            speaking={true}
            appendIcon={<div>test</div>}
          />
        ))}
      </div>
    </div>
  );
};

export default Videotalk;
