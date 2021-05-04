import styled from "styled-components";

export const WorkbanchWrapper = styled.div`
  .markdown-content {
    font-size: 16px !important;
    /* max-height: 745px; */
    height: 100%;
  }

  .top-tools {
    opacity: ${props => {
      return props.isFixed? .9 : 1
    }};
    padding-bottom: ${props => {
      return props.isFixed? '10px': '0px'  
    }};
    background-color: white;
  }

  .show-html {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .introduce-text {
    font-size: 16px;
  }

  .introduce-html {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f0f0f0;
  }

  ul {
    margin-bottom: 16px;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;

    & > li {
      list-style-type: disc;
    }
  }

  h1 {
    padding-bottom: 0.3em;
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid #cbcbcb;
  }

  h2 {
    padding-bottom: 0.3em;
    font-size: 1.75em;
    line-height: 1.225;
    border-bottom: 1px solid #cbcbcb;
  }

  h3 {
    font-size: 1.5em;
    line-height: 1.43;
  }

  h4 {
    font-size: 1.25em;
  }

  p {
    margin-bottom: 16px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #283646;
    color: #ccc;
    border: 0;
    border-radius: 3px;
  }
  pre > code {
    font-size: 100%;
    white-space: pre;
    background: transparent;
  }
  code {
    display: inline;
    max-width: initial;
    padding: 0;
    margin: 0;
    overflow: initial;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
  blockquote {
    border-left: 4px solid #cbcbcb;
    padding: 10px 10px 10px 30px;
    background-color: #f8f8f8;
  }

  img {
    /* max-height: 5vw; */
    max-width: 100%;
    object-fit: cover;
  }

  a {
    color: #4183c4;
    text-decoration: none;
  }

  .date-select {
    margin-top: 10px;
  }
`;
