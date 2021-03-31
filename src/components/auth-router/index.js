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
    window.scrollTo(0, 0)
  }, [pathname])

  return <ConnectedRouter history={history}>{props.children}</ConnectedRouter>;
});
