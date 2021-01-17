import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import MonacoEditor from "react-monaco-editor";
import Button from "@/components/common/button";
import LanguageSelector from "./languageSelector";
import SettingSelector from "./settingSelector";
import EndInterview from "./endInterview";
import { Button as AntBtn, Tooltip, Modal } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { yjsHost } from "@/utils/API";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import languageList from "@/utils/Languages";
// @ts-ignore
import { MonacoBinding } from "y-monaco";
import { useSelector, useDispatch } from "react-redux";
import { useRunShortCut } from "@/hooks/useUtils";
import { runCode } from "@/actions";
import {
  useParams
} from "react-router-dom";

import "./codeeditor.scss";

const CodeEditor: FC = (props) => {
  const { socket } = props;
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const userAccount = useSelector(state => (state as any).accout);
  const currentLanguage = useSelector(state => (state as any).editor.language);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentLanguageHighlight = useMemo(() => {
    const one = languageList.find(i => currentLanguage === i.id);
    return one ? one.highlight : 'javascript'
  }, [currentLanguage])

  const options = useMemo(() => {
    return {
      selectOnLineNumbers: true,
      fontSize: 14,
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    };
  }, []);

  const os = useRunShortCut();

  const onChange = useCallback((newValue, e) => {
    setCode(newValue);
  }, []);
  const editorDidMount = useCallback((editor, monaco) => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(yjsHost, roomId, ydoc);
    const type = ydoc.getText("monaco");
    const monacoBinding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
    // provider.connect();
  }, []);
  const runCodeCallback = useCallback(async () => {
    if (code) {
      const res = await dispatch(
        runCode({
          source_code: code,
          language_id: currentLanguage
        })
      );
      if (res) {
        socket.emit('update', Object.assign({ triger: userAccount.name }, res))
      }
      else {
        console.log('编辑失败');
      }
    }
  }, [code, currentLanguage, userAccount]);

  const endInterview = useCallback(
    () => {
      setIsModalVisible(true);
    },
    [],
  )

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="editor">
      <div className="top-bar">
          <Button color="#c33232" onClick={endInterview}>结束面试</Button>
      </div>
      <Modal
        title="结束面试"
        width={800}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EndInterview />
      </Modal>
      <MonacoEditor
        language={currentLanguageHighlight}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <div className="bottom-bar">
        <Tooltip placement="top" title={os === "mac" ? "⌘+Enter" : "Ctl+Enter"}>
          <AntBtn
            className="run-btn"
            type="primary"
            icon={<CaretRightFilled />}
            onClick={runCodeCallback}
          >
            运行
          </AntBtn>
        </Tooltip>
        <div className="selectors">
          <LanguageSelector />
          <SettingSelector />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
