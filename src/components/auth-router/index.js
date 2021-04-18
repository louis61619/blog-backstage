import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { renderRoutes } from "react-router-config";
import moment from 'moment'
import { ConnectedRouter } from "connected-react-router/immutable";
import { push } from 'connected-react-router'

import { history } from "@/store";
import {
  routes as publicRoutes,
  authRoutes
} from '@/router'


import { getAdminInfoAction } from "@/store/admin/actions";

export default memo(function AuthRouter(props) {

  const [isLogin, setIsLogin] = useState(false)
  const [routes, setRoutes] = useState([])
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
      if (pathname === '/login') {
        dispatch(push('/admin'))
      }
      setIsLogin(true)
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if(isLogin) {
      setRoutes([...publicRoutes, ...authRoutes])
      // console.log('已登錄', window.localStorage.openId)
    } else {
      setRoutes([...publicRoutes])
      // console.log('未登錄')
    }
  }, [isLogin, dispatch])

  return <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>;
});
