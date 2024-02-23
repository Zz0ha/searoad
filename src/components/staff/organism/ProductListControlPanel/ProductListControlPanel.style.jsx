import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

import {
  StDivControlPanel,
  StDivControlPanelButtonGroup,
  StButtonControlPanel,
} from 'styles/staff/ControlPanel.style';

export const StDivProductListControlPanel = styled(StDivControlPanel)`
  align-items: flex-start;
  position: sticky;
  top: 0;
  padding-top: 40px;
  padding-bottom: 20px;
  background-color: white;
`;

export const StDivProductListControlPanelButtonGroup = styled(StDivControlPanelButtonGroup)`
  &.product-inventory {
    .inventory-amount-input {
      font-size: 15px;
      padding: 2px;
    }
  }
`

export const StDivCheckBoxAllWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StButtonProductListControlPanel = styled(StButtonControlPanel)`
  &.active {
    background-color: ${colors.primaryColor};
    &.status-pause {
      background-color: ${colors.warningColor};
    }
    &.status-finish {
      background-color: ${colors.dangerColor};
    }
    &.modify-delete {
      background-color: ${colors.dangerColor};
    }
  }
  &.inventory-change {
    background-color: transparent;
    color: ${colors.primaryColor};
    font-weight: bold;
  }
`;
