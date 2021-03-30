import React, { FC, useCallback, useEffect, useState } from 'react';
import Editor from 'for-editor';
import { updateNote } from '@/actions/interview';
import { useParams } from 'react-router-dom';

import './markdown.scss';

interface MarkdownProps {
  interviewDetail: any;
}

const Markdown: FC<MarkdownProps> = props => {
  const { interviewDetail } = props;
  const [value, setValue] = useState('');
  const { roomId }: any = useParams();

  useEffect(() => {
      if(interviewDetail && interviewDetail.note) {
        setValue(interviewDetail.note);
      }
  }, [interviewDetail]);

  const handleChange = (v: any) => {
    setValue(v);
    console.log(v);
  };

  const handleSave = useCallback(content => {
    console.log(content);
    updateNote({ roomId, content });
  }, []);

  const config = {
    placeholder: '支持markdown语法及预览的笔记，仅您的团队成员可见',
    lineNum: false,
    subfield: true, //双栏模式
    preview: true, //预览模式
    height: '100%',
    style: {},
    toolbar: {
      h1: true, // h1
      h2: true, // h2
      h3: true, // h3
      h4: true, // h4
      img: false, // 图片
      link: true, // 链接
      code: true, // 代码块
      preview: true, // 预览
      expand: false, // 全屏
      undo: true, // 撤销
      redo: true, // 重做
      save: true, // 保存
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

export default Markdown;
