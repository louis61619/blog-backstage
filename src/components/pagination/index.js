import React, { memo, forwardRef, useImperativeHandle, useEffect } from 'react'
import { generatePath } from "react-router";
import { useHistory, useParams, useRouteMatch } from "react-router-dom"
import { Pagination } from 'antd'
import {
  PaginationWrapper
} from './style'

export default memo(forwardRef(function AppPagination({total, changeList}, ref) {

  const history = useHistory()
  const params = useParams();
  let match = useRouteMatch();
  const { page } = params

  // useEffect(() => {
  //   console.log(history, params, location, match)
  //   console.log(generatePath(match.path, {page: 2}))
  // }, [history, params])

  useEffect(() => {
    changeList(page)
  }, [changeList, page])

  useImperativeHandle(ref, () => ({
    resetPage: () => {
      changeList(page)
    }
  }), [changeList, page])

  return (
    <PaginationWrapper>
      <Pagination
        // ref={paginationRef}
        current={Number(page)}
        // defaultCurrent={1}
        total={total}
        defaultPageSize={8}
        showSizeChanger={false}
        onChange={page => {
          // changeList(page)
          // setPage(page)
          // console.log(generatePath(match.path, page))
          history.push({
            pathname: generatePath(match.path, {page})
          });
        }}
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
    </PaginationWrapper>
  )
}))
