import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';
import {
  StDivControlPanel,
  StButtonControlPanel,
} from 'styles/staff/ControlPanel.style';

export const StDivOrderListControlPanel = styled(StDivControlPanel)`
  display: flex;
  flex-direction: column;
  .control-panel__preview {
    margin: 10px 0;
    padding: 10px;
    min-height: 20px;
    border: 1px dashed gray;
  }
`;

export const StButtonOrderListControlPanel = styled(StButtonControlPanel)`
  &.active {
    &.btn__cancel {
      color: black;
      background-color: bisque;
    }
    &.btn__pick {
      background-color: ${colors.primaryColor};
    }
    &.btn__update {
      background-color: ${colors.greenColor};
    }
    &.btn__create {
      color: black;
      background-color: orange;
    }
    &.btn__delete {
      background-color: ${colors.dangerColor};
    }
    &.btn__delivery-fee {
      color: black;
      background-color: rgb(28, 199, 190);
    }
    &.btn__submit {
      background-color: ${colors.primaryColor};
      font-weight: bold;
    }
  }
`;
