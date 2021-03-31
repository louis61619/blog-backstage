import React, {
  memo,
  Fragment,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useContext,
  useEffect
} from "react";

import moment from "moment";
import { replyComment, modifyComment, deleteComment } from "@/services/comment";
import { CommentContext } from '..'

import { EllipsisOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Input, Avatar, Menu, Dropdown, message } from "antd";
import { UserCommentWrapper, ReplyWrapper, UserNameWrapper } from "./style";

const { TextArea } = Input;

function ReplyArea(props) {

  const { 
    placeholder="你想要說什麼？", 
    reply, 
    value, 
    setValue, 
    showTextarea, 
    setShowTextArea 
  } = props

  return (
    <ReplyWrapper>
      <TextArea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="reply-text"
        autoSize={{ minRows: 3, maxRows: 5 }}
        bordered={false}
        showCount
        maxLength={100}
      />
      <div className="area-bottom">
        <Button onClick={(e) => setShowTextArea(false)} type="link">
          取消
        </Button>
        <Button type="primary" onClick={reply}>
          確認
        </Button>
      </div>
    </ReplyWrapper>
  );
}

const Comment = forwardRef((props, ref) => {

  const {
    commentList,
    setCommentList,
    adminInfo
  } = useContext(CommentContext)
  const { setBottomShow, replyList, setReplyList } = props
  const { id, user, content, commentId, createTime, updateTime } = props.item;
  const { id:userId, name:userName, avatarUrl } =  typeof user === "string"? JSON.parse(user): user

  // console.log(props.item)

  const [modify, isModify] = useState(false);
  const [value, setValue] = useState(null);
  const [showTextarea, setShowTextArea] = useState(false);

  useEffect(() => {
    setBottomShow && setBottomShow(showTextarea)
  }, [showTextarea, setBottomShow])
  
  // 修改留言
  const reply = async () => {
    const res = await modifyComment(value, id);
    
    if(replyList) {
      const newReplyList = replyList.map(item => {
        if(item.id === id) {
          const obj = {...item}
          obj.content = value;
          obj.updateTime = res.updateTime
          return obj
        } else {
          return item
        }
      })
      setReplyList(newReplyList)
    } else {
      const newCommentList = commentList.map(item => {
        if(item.id === id) {
          const obj = {...item}
          obj.content = value;
          obj.updateTime = res.updateTime
          return obj
        } else {
          return item
        }
      })
      setCommentList(newCommentList)
    }
    
    setValue(null);
    setShowTextArea(false);
  };

  const deleteAction = async () => {
    deleteComment(id);
    if(replyList) {
      const newReplyList = [...replyList].filter(item => item.id !== id)
      setReplyList(newReplyList)
    } else {
      const newCommentList = [...commentList].filter(item => item.id !== id)
      setCommentList(newCommentList)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={(e) => setShowTextArea(true)}>
        修改評論
      </Menu.Item>
      <Menu.Item key="1" onClick={(e) => deleteAction()}>
        刪除評論
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="comment-item">
      {!showTextarea ? (
        <>
          <div className="top-user">
            <div className="user-avatar">
              <Avatar size={48} src={avatarUrl} />
            </div>
            <div className="user-info">
              <UserNameWrapper author={adminInfo.userId === userId}>
                {userName}
              </UserNameWrapper>
              <span>{moment(updateTime).fromNow()}</span>
            </div>
            <div className="user-select">
                <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
                  <EllipsisOutlined />
                </Dropdown>

            </div>
          </div>
          <div className="content" style={{whiteSpace: 'pre-wrap'}}>{content}</div>
        </>
      ) : (
        <ReplyArea  placeholder={`修改留言`} 
                    reply={reply} 
                    value={value}
                    setValue={setValue}
                    setShowTextArea={setShowTextArea}/>
      )}
    </div>
  );
});

export default memo(function UserComment(props) {

  const {
    adminInfo,
    commentList,
    setCommentList
  } = useContext(CommentContext)
  const { id:commentId, user, content, createTime, childComments, articleId } = props.item;
  const { id:userId, name:userName, avatarUrl } = JSON.parse(user)

  const [value, setValue] = useState(null);
  const [showTextarea, setShowTextArea] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [bottomShow, setBottomShow] = useState(true)
  const [replyList, setReplyList] = useState(childComments? JSON.parse(childComments).sort(function (a, b) {
    return a.updateTime < b.updateTime ? 1 : -1;
  }): [])
  

  // 回覆留言
  const reply = async () => {
    const res = await replyComment(
      commentId,
      articleId,
      value,
      adminInfo.userId
    );
    const newComment = { ...props.item };
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
    const newReplyList = [newComment, ...replyList]
    setReplyList(newReplyList);
    setShowTextArea(false);
    setShowReply(true);
    setValue(null);
  };

  return (
    <UserCommentWrapper>
      <Comment item={props.item} setBottomShow={setBottomShow} />
      { !bottomShow && (
        <div className="bottom">
          <span
            onClick={(e) =>
              replyList?.length && setShowReply(!showReply)
            }
          >
            <MessageOutlined className="icon" />{" "}
            {!showReply ? `${replyList?.length || 0}則回覆` : "收起"}
          </span>
          <div onClick={(e) => setShowTextArea(true)}>回覆</div>
        </div>
      )}
      {/* 第二層 */}
      <div className="second-floor">
        {showTextarea && (
          <ReplyArea  placeholder={`回覆${userName}`} 
                      reply={reply} 
                      value={value}
                      setValue={setValue}
                      setShowTextArea={setShowTextArea}/>
        )}
        {showReply && (
          <div className="second-floor-comment">
            {replyList.map((item) => {
              return <Comment key={item.id} 
                              item={item} 
                              replyList={replyList}
                              setReplyList={setReplyList} />;
            })}
          </div>
        )}
      </div>
    </UserCommentWrapper>
  );
});
