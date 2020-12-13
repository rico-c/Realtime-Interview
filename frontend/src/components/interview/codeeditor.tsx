import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import MonacoEditor from "react-monaco-editor";
import Button from "@/components/common/button";
import LanguageSelector from "./languageSelector";
import { Button as AntBtn, Tooltip } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { yjsHost } from "@/utils/API";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
// @ts-ignore
import { MonacoBinding } from "y-monaco";
import { useSelector, useDispatch } from "react-redux";
import { useRunShortCut } from "@/hooks/useUtils";
import { runCode } from "@/actions";
import {
  useParams
} from "react-router-dom";

import "./codeeditor.scss";

const CodeEditor: FC = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [code, setCode] = useState(
    `var hello = (param) => {console.log("world")};
     hello();`
  );

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
    dispatch(
      runCode({
        source_code: code,
        language_id: 63
      })
    );
  }, [code]);
  return (
    <div className="editor">
      <div className="top-bar">
        <Button color="#c33232">结束面试</Button>
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
        <LanguageSelector />
      </div>
    </div>
  );
};

export default CodeEditor;
