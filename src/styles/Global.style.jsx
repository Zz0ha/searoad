import { createGlobalStyle } from 'styled-components/macro';

import { CodeStyle } from './Code.style';

export const GlobalStyle = createGlobalStyle`
  /* 스크롤 바 없애기 */
  /* body{
    -ms-overflow-style: none;
    }

  ::-webkit-scrollbar {
    display: none;
  }  */

  .flex {
    display: flex;
    align-items: center;
  }
  .hide {
    display: none !important;
  }
  .pointer {
    cursor: pointer;
  }
  .cursorAuto {
      cursor: auto;
    }
  .container {
    width: 1370px;
    margin: 0 auto;
  }
  .ProductGridWrap {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    justify-items: center;
    row-gap: 15px;
    justify-content: space-between;
  }

  /* productCategory */
  .productCategoryMenu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 22px;
  }

  /* Code */
  ${CodeStyle}


  /* modal */
  .closeButton {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    background: #1c53c7;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    p {
    }
  }
`;
