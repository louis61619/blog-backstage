import React, { memo, useRef, useState } from "react";
import moment from 'moment'
import {
  useLocation
} from "react-router-dom";

import { useChangeList } from '@/utils/custom-hooks'
import { getArticleList, deleteContent, searchArticleList } from "@/services/articleList";

import { List, Row, Col, Modal, message, Button, Input } from "antd";
import Pagination from '@/components/pagination'

import { ArticleListWrapper } from "./style";

const { confirm } = Modal;
const { Search } = Input;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default memo(function ArticleList(props) {

  const query = useQuery();
  const { history } = props
  const searchString = query.get('s')
  // const [list, setList] = useState([]);
  // const [count, setCount] = useState(0);
  const [list, count, changeList, setList, setChangeFun] = useChangeList(searchString? async (offset, size) => {
    return searchArticleList(offset, size, searchString)
  } : getArticleList)
  const [value, setValue] = useState(searchString)
  const paginationRef = useRef()

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

  const changeValue = (e) => {
    setValue(e.target.value)
  }

  const onSearch = e => {
    if (value) {
      setChangeFun(() => {
        return async (offset, size) => {
          return searchArticleList(offset, size, value)
        }
      })
      history.replace({
        pathname: history.location.pathname,
        search: `?s=${value}`
      })
    } else {
      setChangeFun(() => {
        return getArticleList
      })
      history.replace({
        pathname: history.location.pathname,
      })
    }
  }

  const updateContent = (id) => {
    history.push("/admin/addArticle/" + id)
  }

  return (
    <ArticleListWrapper>
      <Search placeholder="搜索標題"
              value={value}
              onInput={e => changeValue(e)}
              onSearch={e => onSearch(e)} 
              size="small" 
              style={{ width: 200, marginBottom: '5px' }} />
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>標題</b>
            </Col>
            <Col span={5}>
              <b>標籤</b>
            </Col>
            <Col span={3}>
              <b>發布時間</b>
            </Col>
            {/* <Col span={3}>
              <b>按讚數</b>
            </Col> */}
            <Col span={3}>
              <b>瀏覽數</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                <span>
                  {item.title}
                </span>
              </Col>
              <Col span={5}>
                {item.labels &&
                  JSON.parse(item.labels).map((item) => {
                    return <div key={item.id}>{item.name} </div>;
                  })}
              </Col>
              <Col span={3}>{item.releaseTime? moment(item.releaseTime).format('YYYY-MM-DD'): '未發布'}</Col>
              {/* <Col span={3}>{item.like_count}</Col> */}
              <Col span={3}>{item.view_count}</Col>
              <Col span={5}>
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
