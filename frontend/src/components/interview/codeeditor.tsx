import React, { FC, useMemo, useState, useCallback } from 'react';
import MonacoEditor from 'react-monaco-editor';
import LanguageSelector from './languageSelector';
import SettingSelector from './settingSelector';
import EndInterview from './endInterview';
import { Button, Modal } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { yjsHost } from '@/utils/API';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import languageList from '@/utils/Languages';
// @ts-ignore
import { MonacoBinding } from 'y-monaco';
import { useSelector } from 'react-redux';
import { useRunShortCut } from '@/hooks/useUtils';
import { runCode } from '@/actions';
import LOGO from 'assets/logo/logo-white.svg';
import {
  LoadingOutlined,
} from '@ant-design/icons';

import './codeeditor.scss';

interface CodeEditorProp {
  socket?: any;
  roomId: any
}

const CodeEditor: FC<CodeEditorProp> = props => {
  const { socket, roomId } = props;
  const [code, setCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [running, setRunning] = useState(false);

  const userAccount = useSelector(state => (state as any).accout);
  const currentLanguage = useSelector(state => (state as any).editor.language);

  const currentLanguageHighlight = useMemo(() => {
    const one = languageList.find(i => currentLanguage === i.id);
    return one ? one.highlight : 'javascript';
  }, [currentLanguage]);

  const [fontSize, setFontsize] = useState(14);
  const [tabSize, setTabsize] = useState(4);
  const [suggestion, setSuggestion] = useState(false);

  const options = useMemo(() => {
    return {
      selectOnLineNumbers: true,
      fontSize,
      tabSize,
      automaticLayout: true,
      quickSuggestions: suggestion,
      readOnly: false,
      minimap: {
        enabled: false
      }
    };
  }, [fontSize, tabSize, suggestion]);

  const os = useRunShortCut();

  const onChange = useCallback((newValue, e) => {
    setCode(newValue);
  }, []);

  // 运行编辑器中的代码
  const runCodeCallback = useCallback(async () => {
    if (code) {
      setRunning(true);
      const res = await runCode({
        source_code: code,
        language_id: currentLanguage
      });

      if (res && socket) {
        socket.emit('update', Object.assign({ triger: userAccount.name }, res));
      } else {
        console.log('编辑失败');
      }
      setRunning(false);
    }
  }, [code, currentLanguage, userAccount, socket]);

  // 编辑器初始化
  const editorDidMount = useCallback((editor, monaco) => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(yjsHost, roomId, ydoc);
    const type = ydoc.getText('monaco');
    new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
    provider.connect();
    // 增加自定义快捷键组合
    // editor?.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I], () => {
    //   console.log('short cut');
    //   runCodeCallback();
    // });
  }, [roomId, code]);

  const endInterview = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="editor">
      <div className="top-bar">
        <img src={LOGO} alt="" />
        <Button danger type="primary" onClick={endInterview}>
          结束面试
        </Button>
      </div>
      <Modal
        title="面试评价"
        width={500}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EndInterview closeModal={handleCancel} roomId={roomId} />
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
        {/* <Tooltip placement="top" title={os === 'mac' ? '⌘+i' : 'Ctl+i'}> */}
        <Button
          className="run-btn"
          type="primary"
          icon={running ? <LoadingOutlined /> : <CaretRightFilled />}
          onClick={runCodeCallback}
        >
          {!running && '运行'}
        </Button>
        {/* </Tooltip> */}
        <div className="selectors">
          <LanguageSelector socket={socket} userAccount={userAccount} />
          <SettingSelector
            setFontsize={setFontsize}
            setSuggestion={setSuggestion}
            setTabsize={setTabsize}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
