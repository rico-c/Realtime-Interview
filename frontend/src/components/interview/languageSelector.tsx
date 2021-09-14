import React, { FC, useCallback } from "react";
import languageList from "@/utils/Languages";
import { Select } from "antd";
import { updateLang } from "@/actions";
import { useSelector, useDispatch } from "react-redux";
import "./languageSelector.scss";
import { ReduxState } from 'types';
const { Option } = Select;


const LanguageSelector: FC = () => {
  const dispatch = useDispatch();
  const onChange = useCallback((id) => {
    dispatch(updateLang(id));
  }, [dispatch]);
  const defaultValue = useSelector<ReduxState>(state => state.editor.language) || 63;
  return (
    <div className="language-selector">
      <Select
        showSearch
        style={{ width: 250 }}
        placeholder="选择代码语言"
        optionFilterProp="children"
        defaultValue={defaultValue} //默认JS
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
