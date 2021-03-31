import React, { memo, forwardRef, useEffect, useState } from 'react'

import { addLable } from '@/services/addAritcle';

import { Select, Divider, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'


export default memo(forwardRef(function LabelSelect(props, ref) {

  const { labelInfo, selectedItems, selectLabelHandler } = props

  const [labelList, setLabelList] = useState([])
  const [newLabelname, setNewLabelname] = useState()

  useEffect(() => {
    setLabelList(labelInfo)
  }, [labelInfo])

  const onNameChange = (e) => { // 設置名稱
    setNewLabelname(e.target.value)
  }

  const addItem = async () => { // 將名稱加入表單
    if(!newLabelname) return message.error('標籤不能為空')
    // 判斷標籤名不重複
    const arr = labelList.filter(item => item.name === newLabelname)
    if(arr.length > 0) return message.error('標籤不能重複')
    const obj = {
      name: newLabelname
    }
    const res = await addLable(obj)
    if(!res.isSuccess) return message.error('添加標籤失敗')
    const newArr = [...labelList, { name: newLabelname, id: res.insertId }]
    setLabelList(newArr)
    setNewLabelname('')
    message.success('添加標籤成功')
  };

  return (
    <Select
    mode="multiple"
    style={{ width: '100%' }}
    value={selectedItems}
    onChange={selectLabelHandler}
    optionFilterProp="children"
    dropdownRender={menu => (
      <div>
        {menu}
        <Divider style={{ margin: '4px 0' }} />
        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
          <Input style={{ flex: 'auto' }} value={newLabelname} onChange={e => onNameChange(e)} />
          <span
            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
            onClick={addItem}
          >
            <PlusOutlined /> Add item
          </span>
        </div>
      </div>
    )}
  >
    {
      labelList.map(item => {
        return (
          <Select.Option key={item.name} value={item.id}>
            {item.name}
          </Select.Option>
        )
      })
    }
  </Select>
  )
}))