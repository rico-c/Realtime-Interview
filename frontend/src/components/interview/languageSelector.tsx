import React, { FC, useMemo, useEffect, useRef, useCallback } from "react";
import languageList from "@/utils/Languages";
import "./languageSelector.scss";
import { Select } from "antd";

const { Option } = Select;

const LanguageSelector: FC = () => {
  const onChange = useCallback(() => {
    console.log(111);
  }, []);
  return (
    <div className="language-selector">
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="选择代码语言"
        optionFilterProp="children"
        defaultValue={63} //默认JS
        onChange={onChange}
      >
        {languageList.map(item => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelector;
