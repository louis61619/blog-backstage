import React, {
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import ImgCrop from 'antd-img-crop';
import { shallowEqual, useSelector } from "react-redux";
import { uploadAvatar } from "@/services/workbanch";
import { ErrorImgae } from "@/common/constants";

import { Upload, Descriptions, Button, message } from "antd";
import {
  UploadOutlined,
} from "@ant-design/icons";
import InputArea from '@/components/input-area'
import Chart from '@/components/chart'
import { WorkbanchWrapper, AdminWrapper } from "./style";


export default memo(function Workbanch() {
  const [imgUrl, setImgUrl] = useState(null);

  const {
    adminInfo
  } = useSelector(state => ({
    adminInfo: state.getIn(["admin", "adminInfo"])
  }), shallowEqual)

  const orignImg = useRef(imgUrl);


  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  useEffect(() => {
    setImgUrl(adminInfo.avatarUrl)
    orignImg.current = adminInfo.avatarUrl
  }, [adminInfo])

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


  const handleRequest = ({file}) => {
    const formData = new FormData();
    formData.append('files', file);
    uploadAvatar(formData, adminInfo.userId).then(res => {
      if(res.isSuccess === true) {
        message.success("上傳成功")
        getBase64(file, imageUrl =>
          // console.log(imageUrl)
          setImgUrl(imageUrl)
        );
        return true
      } else {
        message.error("上傳失敗")
        return false
      }
    })
  }

  return (
    <WorkbanchWrapper>
      <AdminWrapper>
      <div className="admin-avatar">
        <img src={imgUrl || ErrorImgae} alt="avatar" width="150" height="150" style={{objectFit: "cover"}} />
        <div className="bottom">
          <ImgCrop rotate>
            <Upload
              customRequest={handleRequest}
              // listType="picture-card"
              // fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={onPreview}
              showUploadList={false}
              className="image-upload"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>上傳</Button>
            </Upload>
          </ImgCrop>
        </div>
      </div>
      <div className="admin-info">
        <Descriptions title="管理員資料" layout="vertical">
          <Descriptions.Item label="暱稱">
            <InputArea text={adminInfo.name} infoKey="name" />
          </Descriptions.Item>
          <Descriptions.Item label="github">
            <InputArea text={adminInfo.github} infoKey="github" />
          </Descriptions.Item>
          <Descriptions.Item label="medium">
            <InputArea text={adminInfo.medium} infoKey="medium" />
          </Descriptions.Item>
          <Descriptions.Item label="email" span={1}>
            <InputArea text={adminInfo.email} infoKey="email" />
          </Descriptions.Item>
          <Descriptions.Item label="標語" span={2}>
            <InputArea text={adminInfo.slogan} infoKey="slogan" />
          </Descriptions.Item>
        </Descriptions>
      </div>
      </AdminWrapper>
      <Chart />
    </WorkbanchWrapper>
  );
});
