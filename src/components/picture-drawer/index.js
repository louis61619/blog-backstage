import React, { memo, useState } from "react";
import Compressor from 'compressorjs';

import { uploadPicture, getArticleById, deletePicture } from "@/services/addAritcle";

import { Drawer, Upload, Modal, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export default memo(function PictureDrawer(props) {

  const { isDrawerShow, setIsDrawerShow, articleId, fileList, setFileList } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [progress, setProgress] = useState(0);

  const onClose = () => {
    setIsDrawerShow(false);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleRemove = async (file) => {
    const imgUrl = file.url.split("/")
    return new Promise((resolve, reject) => {
      confirm({
        title: "提示",
        content: "圖片將永久刪除，無法恢復",
        onOk() {
          deletePicture(imgUrl[imgUrl.length - 1]).then(res => {
            resolve(true);
            message.success("刪除成功");
          })
        },
        onCancel() {
          resolve(false);
          message.success("取消刪除");
        },
      });
    });
  };

  const handleRequest = async (options) => {
    const { file, onProgress } = options;

    const fmData = new FormData();
    const onUploadProgress = (event) => {
      const percent = Math.floor((event.loaded / event.total) * 100);
      setProgress(percent);
      if (percent === 100) {
        setTimeout(() => setProgress(0), 1000);
      }
      onProgress({ percent: (event.loaded / event.total) * 100 });
    };

    console.log(file)

    new Compressor(file, {
      quality: 0.8,
      convertSize: 1000000,
      success(result) {

        fmData.append("image", result, result.name);
        
        uploadPicture(fmData, onUploadProgress, articleId).then((res) => {
          if (!res.isSuccess) message.error('圖片上傳失敗');
          getArticleById(articleId).then(res => {
            setFileList(res.data.images? JSON.parse(res.data.images).map(item => {
              const obj = {}
              obj.uid = item
              obj.name = "image.png";
              obj.status = "done";
              obj.url = item
              return obj
            }): null)
            message.success('圖片上傳成功')
          })
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
    // console.log(fmData)

    // fmData.append("image", file);
    // uploadPicture(fmData, onUploadProgress, articleId).then((res) => {
    //   if (!res.isSuccess) message.error('圖片上傳失敗');
    //   getArticleById(articleId).then(res => {
    //     setFileList(res.data.images? JSON.parse(res.data.images).map(item => {
    //       const obj = {}
    //       obj.uid = item
    //       obj.name = "image.png";
    //       obj.status = "done";
    //       obj.url = item
    //       return obj
    //     }): null)
    //     message.success('圖片上傳成功')
    //   })
    // });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const footer = (
    <div onClick={e => {
      var dummy = document.createElement('input')
      document.body.appendChild(dummy);
      const imageUrl = new URL(previewImage)
      dummy.value = `![images](${imageUrl.pathname.substr(1)})`;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      message.success('複製圖片地址成功')
      setPreviewVisible(false)
      setIsDrawerShow(false);
    }}>
      <Button>複製圖片路徑</Button>
    </div>
  )

  return (
    <Drawer
      title="Basic Drawer"
      width={720}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isDrawerShow}
    >
      <Upload
        accept="image/*"
        customRequest={handleRequest}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 20 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={footer}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Drawer>
  );
});
