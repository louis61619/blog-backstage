import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import { getComment, replyComment } from "@/services/comment";
import { Comment, Avatar, Tooltip, Input, Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from '@ant-design/icons'
import { CommentBoardWrapper } from "./style";
import { shallowEqual, useSelector } from "react-redux";

const { TextArea } = Input;

const UserComment = ({
  children,
  comment,
  secondFloor,
  index,
  commentList,
  setCommentList,
}) => {
  const { articleId, content, updateTime, user, id: commentId } = comment;
  const { id, name, avatarUrl } =
    typeof user === "string" ? JSON.parse(user) : user;
  const [value, setValue] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [childShow, setchildShow] = useState(false)

  console.log("重新渲染");

  const { adminInfo } = useSelector(
    (state) => ({
      adminInfo: state.getIn(["admin", "adminInfo"]),
    }),
    shallowEqual
  );

  const reply = async () => {
    const res = await replyComment(
      commentId,
      articleId,
      value,
      adminInfo.userId
    );
    const newComment = { ...comment };
    newComment.commentId = commentId;
    newComment.content = value;
    newComment.createTime = res.createTime;
    newComment.id = res.insertId;
    newComment.updateTime = res.createTime;
    newComment.user = JSON.stringify({
      id: adminInfo.userId,
      name: adminInfo.name,
      avatarUrl: adminInfo.avatarUrl,
    });
    newComment.userId = adminInfo.userId;
    const newCommentList = commentList.map((itemy, indey) => {
      if (indey === index) {
        const obj = { ...itemy };
        const arr = JSON.parse(obj.childComments);
        obj.childComments = JSON.stringify([newComment, ...arr]);
        return obj;
      } else {
        return itemy;
      }
    });
    setCommentList(newCommentList);
    setIsShow(false);
    setchildShow(true);
    setValue(null);
  };
  
  const menu = (
    <Menu>
      <Menu.Item>
        修改留言
      </Menu.Item>
      <Menu.Item>
        刪除留言
      </Menu.Item>
      <Menu.Item>
        加入黑名單
      </Menu.Item>
    </Menu>
  );

  return (
    <Comment
      actions={[
        !secondFloor && (
          <>
            <span onClick={(e) => setIsShow(!isShow)}>
              {!isShow ? "回覆" : "取消"}
            </span>
            <span onClick={(e) => setchildShow(!childShow)}>
              {!childShow ? "展開留言" : "收起"}
            </span>
          </>
        ),
        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
          <MoreOutlined />
        </Dropdown>
      ]}
      author={<span>{name}</span>}
      avatar={<Avatar src={avatarUrl} alt={name} />}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={moment(updateTime).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(updateTime).fromNow()}</span>
        </Tooltip>
      }
    >
      {isShow && (
        <div className="text-area">
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div className="bottom">
            <Button size="small" onClick={reply}>
              回覆
            </Button>
            {/* <Button size="small" onClick="cancel">取消</Button> */}
          </div>
        </div>
      )}
      { childShow && children}
    </Comment>
  );
};

// const AuthComment = ({})

export default memo(function CommentBoard() {
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    getComment().then((res) => {
      setCommentList(res);
    });
  }, []);

  const sortAndToJson = (arr) => {
    const newArray = JSON.parse(arr).sort(function (a, b) {
      return a.updateTime < b.updateTime ? 1 : -1;
    });
    return newArray;
  };

  return (
    <CommentBoardWrapper>
      {commentList &&
        commentList.map((item, index) => {
          return (
            <UserComment
              key={item.id}
              comment={item}
              index={index}
              commentList={commentList}
              setCommentList={setCommentList}
            >
              {
                // item.childComments
                item.childComments &&
                  sortAndToJson(item.childComments).map((itemx) => {
                    return (
                      <UserComment key={itemx.id} comment={itemx} secondFloor />
                    );
                  })
              }
            </UserComment>
          );
        })}
    </CommentBoardWrapper>
  );
});
