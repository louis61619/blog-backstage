import styled from "styled-components";

export const UserCommentWrapper = styled.div`
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  padding: 25px 0 16px 0;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .top-user {
    display: flex;
    height: 40px;
    margin-bottom: 15px;
    & > * {
      margin-right: 8px;
    }
    .user-avatar {
      display: flex;
      align-items: center;
    }
    .user-info {
      display: flex;
      justify-content: center;
      flex-direction: column;

      /* .user-name::after {
        content: "作者";
        position: absolute;
        font-size: 13px;
        top: -5px;
        right: -5px;
        background-color: rgb(26, 137, 23);
        color: #fff;
        padding: 0px 2px;
      } */
    }
    .user-select {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      font-size: 1.5rem;
      height: 20px;
    }
  }

  .content {
    padding: 5px 0px;
    margin-bottom: 15px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 5px 10px 0px;

    span {
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        font-size: 1.5rem;
        margin-right: 8px;
        color: rgba(117, 117, 117, 0.75);
      }
    }

    & > div {
      width: 35px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .second-floor {
    padding: 0 25px;
    border-left: 3px solid rgb(230, 230, 230);

    /* .second-floor-reply {
      
    } */

    .second-floor-comment {
      margin-top: 15px;
      .comment-item {
        
        padding: 25px 0 16px 0;
        border-bottom: 1px solid rgba(230, 230, 230, 1);

        &:last-child {
          border-bottom: 0;
        }
      }
      
    }
  }
`;

export const ReplyWrapper = styled.div`
  padding: 15px 8px;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 8px;
  border-radius: 4px;
  transition: 400ms ease 0s;

  .reply-text {
    position: relative;
    textarea {
      padding: 0 3px;
    }
  }

  .area-bottom {
    display: flex;
    justify-content: flex-end;
  }
  .ant-input-textarea-show-count::after {
    position: absolute;
    bottom: -35px;
    left: 7px;
  }
`;

export const UserNameWrapper = styled.div`
  position: relative;
  
  &::after {
    content: "作者";
    display: ${
      props => props.author? "block": "none"
    };
    position: absolute;
    font-size: 13px;
    top: -5px;
    right: -5px;
    background-color: rgb(26, 137, 23);
    color: #fff;
    padding: 0px 2px;
  }
`
