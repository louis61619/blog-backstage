

 # 部落格後台

這是一個力求操作流暢、體驗舒適的部落格管理介面，使用React搭建，你的星星是我最大的鼓勵

如果有任何可以改進的地方，歡迎來到我的部落格留言或是提交issue

部落格地址：https://mycoderland.tw

前台源碼：https://github.com/louis61619/blog-frontstage.git

後台源碼：https://github.com/louis61619/blog-backstage.git

服務端源碼：https://github.com/louis61619/blog-server.git



## 技術棧

以下列出主要使用的框架和庫

- React
- React-router
- React-redux
- Immutable
- Echarts
- Ant-design
- Marked
- Styled-components
- Axios
- craco



## 開發環境搭建

> 由於本項目是採用前後端分離，所以需要同時下載前後端的部分，項目中提供了一組FB登錄API的測試權杖

- 下載nodejs，nodejs版本需大於13，推薦使用yarn取代npm

- 下載本項目後端 : https://github.com/louis61619/blog-server

- 資料庫使用mysql

  - 如果要使用本地mysql，請匯入後端項目內的sql資料，具體步驟如下:
    - 創建資料庫並命名為react_blog
    - 設定mysql端口為3310
    - 匯入資料，該檔案位於/react-blog02.sql
    - 如果要修改設定參數請參閱
  - 如果不想使用本地mysql 可以使用docker，只要下指令**dokcer -d -p 3310:3306 louis61619/blog-data**即可運行該鏡像

- 啟用後端API

  ```
  yarn install && yarn dev
  ```

- 如果想要在開發環境中瀏覽部落格，請下載blog前台 https://github.com/louis61619/blog-frontstage.git，然後在根目錄下指令(默認啟用端口為3000)

  ```
  yarn install && yarn start
  ```

- 如果想要在開發環境中編輯部落格內容，請下載blog後台 https://github.com/louis61619/blog-backstage.git，然後在根目錄下指令(默認啟用端口為3001)

  ```
  yarn install && yarn dev
  ```

  

## 環境變量

| Keys                 | Introduction |
| -------------------- | ------------ |
| REACT_APP_SERVER_URL | 服務端URL    |
| REACT_APP_STATIC_URL | 圖片地址前綴 |



## 功能

> 1.0

- 登錄

![image-20210507160410319](./images/image-20210507160410319.png)

- 總覽
  - 修改管理員資料

  - 瀏覽量統計

![image-20210507160319127](./images/image-20210507160319127.png)

- 會員管理
  - 黑名單(禁止留言)

![](./images/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202021-05-07%20161218.png)

- 文章管理
  - 添加文章
  - 文章列表
  - 搜索標題

![image-20210510203845053](/Users/hsiehjungjui/Library/Application Support/typora-user-images/image-20210510203845053.png)

![image-20210510203942265](/Users/hsiehjungjui/Library/Application Support/typora-user-images/image-20210510203942265.png)

- 留言管理
  - 刪除留言
  - 回覆留言

![image-20210510204110366](/Users/hsiehjungjui/Library/Application Support/typora-user-images/image-20210510204110366.png)