import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';
import sizes from 'styles/variables/sizes';

export const StTableMainContent = styled.table`
  font-size: ${sizes.tableFontSize}px;
  width: 100%;
  th {
    background-color: ${colors.tableHeaderColor};
    border-bottom: 2px solid black !important;
  }
  th, td{
    border: 1px solid ${colors.borderColor};
  }
  tr.first-row-of-group {
    & > td {
      border-top: 2px solid black;
    }
  }
  td {
    padding: 1px 2px;
    text-align: center;
    &.align-left {
      text-align: left;
    }
    &.align-right {
      text-align: right;
    }
    &.textarea-width {
      width: 400px;
      max-width: 400px;
      word-break: break-all;
    }
  }
  .is-defective {
    color: red;
  }
`;
