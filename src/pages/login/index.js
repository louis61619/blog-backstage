import React, { memo, useState, useCallback } from "react";

import { getLoginOpenId } from "@/services/login";

import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Card, Input, Button, Spin, message } from "antd";

import { LoginWrapper } from "./style";

export default memo(function Login(props) {
  const { history } = props;

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = useCallback(async () => {
    setIsLoading(true);

    if (!userName) {
      message.error("用戶名不能為空");
      return false;
    } else if (!password) {
      message.error("密碼不能為空");
      return false;
    }

    const res = await getLoginOpenId(userName, password);
    console.log(res)
    // return
    setIsLoading(false);
    if (res.data === "success") {
      localStorage.setItem("openId", res.openId);
      history.push("/admin");
    } else {
      message.error("用戶名或密碼錯誤");
    }
  }, [userName, password, history]);

  return (
    <LoginWrapper>
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            {" "}
            Login in{" "}
          </Button>
        </Card>
      </Spin>
    </LoginWrapper>
  );
});
