import React, { memo, useRef } from 'react'
import moment from 'moment'

import { useChangeList } from '@/utils/custom-hooks'
import { getMemberList, addBlock } from '@/services/member';

import { List, Row, Col, Checkbox, message } from "antd";
import Pagination from '@/components/pagination'
import {
  MemberWrapper,
} from './style'

export default memo(function Member() {
  // const [list, setList] = useState()
  // const [count, setCount] = useState()
  const [list, count, changeList, setList] = useChangeList(getMemberList)
  const paginationRef = useRef()

  // useEffect(() => {
  //   getMemberList().then(res => {
  //     setList(res.data)
  //     setCount(res.count)
  //   })
  // }, [])

  // const changeList = (page) => {
  //   getMemberList((page - 1) * 8, page * 8).then(res => {
  //     setList(res.data);
  //   })
  // }

  const checkChange = (e, index) => {
    const newList = list.map((item, indey) => {
      if(indey === index) {
        const newItem = {...item}
        newItem.block = e.target.checked
        return newItem
      }
      return item
    })
    setList(newList)
    addBlock(e.target.checked, list[index].id).then(res => {
      if(res.isSuccess) return message.success(e.target.checked? "已加入黑名單": "已取消黑名單")
    })
  }

  return (
    <MemberWrapper>
      <List
        header={
          <Row className="list-div">
            <Col span={1}>
              <b>id</b>
            </Col>
            <Col span={3}>
              <b>頭像</b>
            </Col>
            <Col span={5}>
              <b>暱稱</b>
            </Col>
            <Col span={6}>
              <b>email</b>
            </Col>
            <Col span={3}>
              <b>創建時間</b>
            </Col>
            <Col span={3}>
              <b>修改時間</b>
            </Col>
            <Col span={3}>
              <b>黑名單</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <Row className="list-div">
              <Col span={1}>
                {item.id}
              </Col>
              <Col span={3}>
                <img width="50" height="50" src={item.avatarUrl} alt="avatar" />
              </Col>
              <Col span={5}>
                {item.name}
              </Col>
              <Col span={6}>
                {item.email}
              </Col>
              <Col span={3}>
                {moment(item.createTime).format('YYYY-MM-DD hh:mm')} 
              </Col>
              <Col span={3}>
                {moment(item.updateTime).format('YYYY-MM-DD hh:mm')}
              </Col>
              <Col span={3}>
                <Checkbox onChange={e => checkChange(e, index)} checked={item.block} />
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Pagination total={count} changeList={changeList} ref={paginationRef} />
    </MemberWrapper>
  )
})
