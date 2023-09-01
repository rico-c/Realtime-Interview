import React, { FC, useCallback, useEffect, useState, useRef } from 'react';
import Editor from 'for-editor';

interface QuestionEditorProps {
  setEditorContent: any;
}

const QuestionEditor: FC<QuestionEditorProps> = (props) => {
  const {setEditorContent} = props;
  const [value, setValue] = useState('');
  const editorRef = useRef();

  const handleChange = useCallback(content => {
    setEditorContent(content)
    setValue(content)
  }, [setEditorContent]);

  const handleImg = useCallback(file => {
    (editorRef as any).current.$img2Url(file.name, 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg')
  }, []);

  const config = {
    placeholder: '请输入题目内容，支持markdown语法',
    lineNum: false,
    subfield: true, //双栏模式
    preview: true, //预览模式
    height: '250px',
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
        ref={editorRef}
        value={value}
        onChange={handleChange}
        addImg={handleImg}
      />
    </div>
  );
};

export default QuestionEditor;
