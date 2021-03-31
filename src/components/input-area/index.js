import React, {
  memo,
  useEffect,
  useState,
  Fragment,
} from "react";
import { useDispatch } from 'react-redux'
import { changeAdminDetailAction } from "@/store/admin/actions";
import {  Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";



export default memo(function InputArea ({ text, infoKey }) {
  const [isModify, setIsModify] = useState(false);
  const [value, setValue] = useState(text);

  useEffect(() => {
    // console.log(text)
    setValue(text)
  }, [text])

  const check = () => {
    setIsModify(false);
    dispatch(changeAdminDetailAction([infoKey, value]))
  };

  const dispatch = useDispatch()

  const close = () => {
    setValue(text)
    setIsModify(false);
  };

  const edit = () => {
    setIsModify(true);
  };

  return (
    <div className="input-area">
      {/* <span className="text">{text} : </span> */}
      <span className="input-box">
        {isModify ? (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
          value? value: "(無)"
        )}
      </span>
      <span className="icon">
        {!isModify ? (
          <EditOutlined onClick={edit} />
        ) : (
          <>
            <CheckOutlined onClick={check} />
            <CloseOutlined onClick={close} />
          </>
        )}
      </span>
    </div>
  );
});