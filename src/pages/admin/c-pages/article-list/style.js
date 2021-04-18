import styled from 'styled-components'

export const ArticleListWrapper = styled.div`

  .list-div {
    width: 100%;
    div {
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(1) {
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &:nth-child(2) {
        flex-direction: column;
      }
    }
  }

`