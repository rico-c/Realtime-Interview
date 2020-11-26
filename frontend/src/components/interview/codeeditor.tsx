import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import MonacoEditor from 'react-monaco-editor';
import Button from '@/components/common/button';
import LanguageSelector from './languageSelector';
import { Button as AntBtn } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { yjsHost } from '@/utils/API';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
// @ts-ignore
import { MonacoBinding } from 'y-monaco'
import { runCodeToken} from '@/utils/Requests';

import './codeeditor.scss';

const CodeEditor: FC = () => {
  const [code, setCode] = useState('const hello = (param) => {console.log("world")};hello();');
  const options = useMemo(() => {
    return {
      selectOnLineNumbers: true,
      fontSize: 14,
      IEditorMinimapOptions: false,
      automaticLayout: true
    }
  }, []);

  const onChange = useCallback((newValue, e) => {
    setCode(newValue);
  }, []);
  const editorDidMount = useCallback((editor, monaco) => {
    const roomName = 'room1';
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(yjsHost, roomName, ydoc);
    const type = ydoc.getText('monaco');
    const monacoBinding = new MonacoBinding(type, (editor.getModel()), new Set([editor]), provider.awareness);
    // provider.connect();
  }, []);
  const runCode = useCallback(async() => {
    const res = await runCodeToken({
      source_code: code,
      language_id: 63
    })
    console.log(res);
  }, [code]);
  return (
    <div className="editor">
      <div className="top-bar">
        <Button color="#F56C6C">结束面试</Button>
      </div>
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <div className="bottom-bar">
        <AntBtn className="run-btn" type="primary" icon={< CaretRightFilled />} color="red" onClick={runCode}>运行</AntBtn>
        <LanguageSelector />
      </div>
    </div>
  )
}

export default CodeEditor;