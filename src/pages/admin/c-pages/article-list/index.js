import React, { memo, useRef } from "react";
import moment from 'moment'

import { useChangeList } from '@/utils/custom-hooks'
import { getArticleList, deleteContent } from "@/services/articleList";

import { List, Row, Col, Modal, message, Button } from "antd";
import Pagination from '@/components/pagination'

import { ArticleListWrapper } from "./style";

const { confirm } = Modal;

export default memo(function ArticleList(props) {

  const { history } = props
  // const [list, setList] = useState([]);
  // const [count, setCount] = useState(0);
  const [list, count, changeList] = useChangeList(getArticleList)
  const paginationRef = useRef()

  // useEffect(() => {
  //   getList()
  // }, []);

  //删除文章的方法
  const deleteList = (id) => {
    // console.log(paginationRef)
    confirm({
      title: "提示",
      content: "文章將永久刪除，無法恢復",
      onOk() {
        deleteContent(id).then(res => {
          if(!res.isSuccess) return message.error("文章刪除失敗")
          message.success("文章刪除成功")
          paginationRef.current.resetPage()
        })
      },
      onCancel() {
        message.success("取消刪除");
      },
    });
  };

  // 獲取文章列表的方法
  // const getList = () => {
  //   getArticleList().then((res) => {
  //     setCount(res.count)
  //     setList(res.data);
  //   });
  // }

  // const changeList = page => {
  //   getArticleList((page - 1) * 8, page * 8).then(res => {
  //     setList(res.data);
  //   })
  // }

  const updateContent = (id) => {
    history.push("/admin/addArticle/" + id)
  }

  return (
    <ArticleListWrapper>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>標題</b>
            </Col>
            <Col span={3}>
              <b>標籤</b>
            </Col>
            <Col span={3}>
              <b>發布時間</b>
            </Col>
            <Col span={3}>
              <b>按讚數</b>
            </Col>
            <Col span={3}>
              <b>瀏覽數</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>
                {item.labels &&
                  JSON.parse(item.labels).map((item) => {
                    return <div key={item.id}>{item.name} </div>;
                  })}
              </Col>
              <Col span={3}>{item.releaseTime? moment(item.releaseTime).format('YYYY-MM-DD'): '未發布'}</Col>
              <Col span={3}>{item.like_count}</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary" onClick={e => updateContent(item.id)}>修改</Button>&nbsp;
                <Button onClick={e => deleteList(item.id)}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Pagination total={count} changeList={changeList} ref={paginationRef} />
    </ArticleListWrapper>
  );
});
