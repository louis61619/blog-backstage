import styled from "styled-components";

export const CommentAreaWrapper = styled.div`
  padding: 15px 8px;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 8px;
  border-radius: 4px;
  transition: 400ms ease 0s;
  margin-bottom: 20px;

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
      align-items: center;
      justify-content: center;
    }
  }

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
