import React, { memo, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import { history } from "@/store";
import { ConnectedRouter } from "connected-react-router/immutable";
import { push } from 'connected-react-router'

import { getAdminInfoAction } from "@/store/admin/actions";

export default memo(function AuthRouter(props) {
  const { pathname } = useSelector(
    (state) => ({
      pathname: state.getIn(["router", "location", "pathname"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(new Date().getTime())
    // console.log(moment(Number(window.localStorage.openId)).add(1, "day").valueOf())
    // console.log(moment(Number(window.localStorage.openId)).add(1, "day").format("YYYY-MM-DD hh:mm"))
    const expiryDate = moment(Number(window.localStorage.openId)).add(1, "day").valueOf()
    // 計算時間戳的長度
    if( !window.localStorage.openId || new Date().getTime() > expiryDate) {
      dispatch(push('/login'))
    } else {
      dispatch(getAdminInfoAction())
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    // console.log("9999")
    window.scrollTo(0, 0)
    // try {
    //   let scrollY = sessionStorage.getItem(pathname)
    //   scrollY && window.scrollTo(0, scrollY)
    // } catch (error) {
    //   throw error
    // }
    // return () => {
    //   try {
    //     sessionStorage.setItem(pathname, window.scrollY)    //这里使用scrollY是获取文档window在垂直页面
    //   } catch (error) {                                     //的滚动值，如果是特定DOM元素用srcollTop
    //     throw error
    //   }
    // }
  }, [pathname])

  return <ConnectedRouter history={history}>{props.children}</ConnectedRouter>;
});
