import React, { FC, useState, useCallback } from "react";
import { Button, Modal } from 'antd';
import languageData from '@/utils/Languages';
import './languageSelector.scss';

interface LSProp {
  changeLanguage: any;
}

const LanguageSelector: FC<LSProp> = (props) => {
  const { changeLanguage } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLanguage, setLanguage] = useState(null);
  const handleSelect = useCallback(
    (item) => {
      changeLanguage(item.id);
      setLanguage(item);
      setIsModalVisible(false);
    },
    [],
  )
  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>
        {currentLanguage ? currentLanguage.name : '选择语言'}
      </Button>
      <Modal title="选择代码语言" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width="60%">
        <div className="language-selector-modal">
          {languageData.map(item => (
            <Button key={item.name} className="language-item" type="text" onClick={() => handleSelect(item)}>{item.name}</Button>
          ))}
        </div>
      </Modal>
    </div>
  )
}
export default LanguageSelector;