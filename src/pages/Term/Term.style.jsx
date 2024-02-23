import styled from 'styled-components/macro';

export const StDivTerm = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 20px 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin: 20px 0 20px 10px;
  }
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    padding-left: 22px;
  }
  li {
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0;
    padding: 0;
  }
  th,
  td {
    padding: 2px 5px;
    border: 1px solid #333;
  }
  th {
    font-weight: 700;
    text-align: center;
  }
  td {
    text-align: left;
    vertical-align: center;
  }
  .article {
    width: 100%;
    overflow: auto;
    margin: 20px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
  }
  .article-title {
    font-weight: 700;
    margin: 0;
    padding: 0;
  }
  .align-right {
    text-align: right;
  }
  .num {
    margin-left: -20px;
    margin-right: 5px;
  }
`;
