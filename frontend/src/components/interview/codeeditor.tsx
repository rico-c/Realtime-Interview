import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import MonacoEditor from 'react-monaco-editor';
import Button from '@/components/common/button';
import { Button as AntBtn } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
// @ts-ignore
import { MonacoBinding } from 'y-monaco'

import './codeeditor.scss';

const CodeEditor: FC = () => {
  const [code, setCode] = useState('const hello = (param) => {console.log("world")};');
  const options = useMemo(() => {
    return {
      selectOnLineNumbers: true,
      fontSize: 14,
      IEditorMinimapOptions: false,
      automaticLayout: true
    }
  }, []);

  const ydoc = new Y.Doc()
  const roomName = 'room1';
  const provider = new WebsocketProvider('ws://127.0.0.1:1234', roomName, ydoc)
  const type = ydoc.getText('monaco')


  const onChange = useCallback((newValue, e) => {
    console.log('onChange')
  }, []);
  const editorDidMount = useCallback((editor, monaco) => {
    const monacoBinding = new MonacoBinding(type, (editor.getModel()), new Set([editor]), provider.awareness);
    provider.connect();
  }, []);
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
        <AntBtn className="run-btn" type="primary" icon={< CaretRightFilled />} color="red">运行</AntBtn>
      </div>
    </div>
  )
}

export default CodeEditor;