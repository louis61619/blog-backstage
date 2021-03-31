import React, { memo, Fragment, useState, useContext, useEffect } from "react";
// import {
//   writeComment
// } from '~/services/comment'
import { Button, Input, Avatar, message } from "antd";
import { CommentAreaWrapper } from "./style";
import { CommentContext } from "..";

const { TextArea } = Input;

export default memo(function CommentArea(props) {

  const {
    userInfo,
    commentList,
    setCommentList
  } = useContext(CommentContext)

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null)

  const focusArea = () => {
    setIsFocus(true)
  };

  const leaveMessage = async () => {
    // const res = await writeComment(articleId, value)
    // console.log(res.insertId)
    const message = {
      commentId: null,
      content: value,
      // createTime: res.createTime,
      // id: res.insertId,
      user: {
        avatarUrl: userInfo.avatarUrl,
        id: userInfo.id,
        name: userInfo.name,
      }
    }
    // console.log(commentList)
    setCommentList([...commentList, message])
    setValue(null);
    setIsFocus(false);
  }

  return (
    <>
      {isFocus ? (
        <CommentAreaWrapper>
          <div className="top-user">
            <div className="user-avatar">
              <Avatar size={32} src={userInfo.avatarUrl} />
            </div>
            <div className="user-info">
              <span>{userInfo.name}</span>
            </div>
          </div>

          <TextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="你想要說什麼？"
            className="reply-text"
            autoSize={{ minRows: 3, maxRows: 5 }}
            bordered={false}
            showCount
            maxLength={100}
          />
          <div className="area-bottom">
            <Button onClick={leaveMessage} type="primary">留言</Button>
          </div>
        </CommentAreaWrapper>
      ) : (
        <TextArea
          className="text-area"
          placeholder="你想要說什麼？"
          onFocus={focusArea}
          autoSize
        />
      )}
    </>
  );
});
