import styled from "styled-components";

export const WorkbanchWrapper = styled.div`

  
`;

export const AdminWrapper = styled.div`
    display: flex;

.admin-avatar {
  margin-right: 20px;
  .bottom {
    padding-top: 10px;
    .icon-selected {
      font-size: 18px;
      & > span {
        margin-left: 8px;
        &:hover {
          color: #1890ff;
          cursor: pointer;
        }
      }
    }
  }
}
.admin-info {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  /* .ant-descriptions {
    width: 100%;
  } */
  
  .input-area {
    
    display: flex;
    align-items: center;
    /* padding: 6px 20px; */
    width: 100%;
    
    /* &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(2) {
      width: 50%;
    }
    &:nth-child(3) {
      width: 30%;
    }
    &:nth-child(4) {
      width: 70%;
    }
    &:nth-child(5) {
      width: 50%;
    }
    &:nth-child(6) {
      width: 50%;
    }
    &:nth-child(7) {
      width: 100%;
    } */


    .text {
      margin-right: 8px;
      /* min-width: 70px; */
    }
    .input-box {
      /* flex: 1; */
      width: 80%;
      height: 30px;
      line-height: 30px;
    }
    .icon {
      font-size: 16px;
      &>span {
        margin-left: 6px;
        &:hover {
          color: #1890ff;
          cursor: pointer;
        }
      }
    }
  }
}

`;