import React, { FC, useMemo, useState, useCallback, ReactDOM } from 'react';
import MonacoEditor from 'react-monaco-editor';
import LanguageSelector from './languageSelector';
import SettingSelector from './settingSelector';
import EndInterview from './endInterview';
import { Button, Modal } from 'antd';
import { CaretRightFilled, LeftOutlined } from '@ant-design/icons';
import { yjsHost } from 'utils/api';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import languageList from 'utils/Languages';
// @ts-ignore
import { MonacoBinding } from 'y-monaco';
import { useSelector } from 'react-redux';
import { useRunShortCut } from 'hooks/useUtils';
import { runCode } from 'actions';
import { useHistory } from "react-router-dom";
import LOGO from 'assets/logo/logo-white.png';
import {
  LoadingOutlined,
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import './codeeditor.scss';

interface CodeEditorProp {
  socket?: any;
  roomId: string;
  videocallDom: any;
  demo: any;
}

const CodeEditor: FC<CodeEditorProp> = props => {
  const { socket, roomId, videocallDom, demo } = props;
  const [code, setCode] = useState('');
  const [yjsInstance, setYjsInstance] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [running, setRunning] = useState(false);
  const history = useHistory();

  const userAccount = useSelector(state => (state as any).accout);
  const currentLanguage = useSelector(state => (state as any).editor.language);
  const {t, i18n} = useTranslation('common')
  const currentLanguageName = useMemo(() => {
    const one = languageList.find(i => currentLanguage === i.id);
    const res = one ? one.highlight : 'javascript';
    return res;
  }, [currentLanguage]);

  const [fontSize, setFontsize] = useState(14);
  const [tabSize, setTabsize] = useState(4);
  const [suggestion, setSuggestion] = useState(true);

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
    if (!!code && !!currentLanguage && currentLanguage > 0) {
      setRunning(true);
      const res = await runCode({
        source_code: code,
        language_id: currentLanguage
      });

      if (res && socket) {
        socket.emit('update', Object.assign({ triger: userAccount.name, language: currentLanguageName }, res));
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
    setYjsInstance(provider);
    // 增加自定义快捷键组合
    // editor?.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I], () => {
    //   console.log('short cut');
    //   runCodeCallback();
    // });
  }, [roomId, code]);

  const backDashboard = async () => { 
    await socket.close(); 
    await yjsInstance.destroy();
    history.push('/dashboard') 
  }

  const endInterview = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="editor">
      <div className="top-bar">
        <span className="flex items-center">
          <img src={LOGO} alt="" />
          {!demo && <Button type="link" icon={<LeftOutlined />} onClick={backDashboard}>{t('back-dashboard')}</Button>}
          <Button danger type="primary" onClick={endInterview}>
            {t('end-interview')}
          </Button>
        </span>
        {videocallDom}
      </div>
      <Modal
        title={t('interviewcomment')}
        width={500}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EndInterview closeModal={handleCancel} roomId={roomId} socket={socket} yjsInstance={yjsInstance} />
      </Modal>
      <MonacoEditor
        language={currentLanguageName}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <div className="bottom-bar">
        <Button
          className="run-btn"
          type="primary"
          icon={running ? <LoadingOutlined /> : <CaretRightFilled />}
          onClick={runCodeCallback}
        >
          {!running && t('run-code')}
        </Button>
        <div className="selectors">
          <LanguageSelector socket={socket} userAccount={userAccount} />
          <SettingSelector
            setFontsize={setFontsize}
            setSuggestion={setSuggestion}
            suggestion={suggestion}
            setTabsize={setTabsize}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
