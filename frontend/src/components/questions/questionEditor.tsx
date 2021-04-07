import React, { FC, useCallback, useEffect, useState } from 'react';
import Editor from 'for-editor';
import { updateNote } from '@/actions/interview';
import { useParams } from 'react-router-dom';

const QuestionEditor: FC = () => {
  const [value, setValue] = useState('');
  const { roomId }: any = useParams();

  const handleChange = (v: any) => {
    setValue(v);
    console.log(v);
  };

  const handleSave = useCallback(content => {
    console.log(content);
    updateNote({ roomId, content });
  }, []);

  const config = {
    placeholder: '请输入题目内容，支持markdown语法',
    lineNum: false,
    subfield: true, //双栏模式
    preview: true, //预览模式
    height: '200px',
    style: {},
    toolbar: {
      h1: true, // h1
      h2: true, // h2
      h3: true, // h3
      h4: true, // h4
      img: true, // 图片
      link: true, // 链接
      code: true, // 代码块
      preview: true, // 预览
      expand: false, // 全屏
      undo: true, // 撤销
      redo: true, // 重做
      save: false, // 保存
      /* v0.2.3 */
      subfield: true // 单双栏模式
    }
  };
  return (
    <div className="markdown">
      <Editor
        {...config}
        value={value}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default QuestionEditor;
