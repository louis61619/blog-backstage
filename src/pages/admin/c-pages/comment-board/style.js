import styled from "styled-components";

export const CommentBoardWrapper = styled.div`
  font-size: 16px;

  .ant-comment-content {
    font-size: 16px;
    span {
      font-size: 14px;
    }
  }

  .text-area {
    .bottom {
      margin-top: 10px;

      & > .ant-btn {
        margin-right: 10px;
      }
    }
  }
`