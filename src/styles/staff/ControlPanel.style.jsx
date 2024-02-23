import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';
import sizes from 'styles/variables/sizes';

export const StDivFlex = styled.div`
  .flex, &.flex {
    display: flex;
  }
  .horizontal, &.horizontal {
    flex-direction: row;
    gap: 40px;
  }
  .item-gap {
    gap: 10px;
  }
`;

export const StDivControlPanel = styled(StDivFlex)`
  margin-bottom: 10px;
  .space-between {
    justify-content: space-between;
  }
`;

export const StDivControlPanelButtonGroup = styled(StDivFlex)`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  .group-title {
    font-size: ${sizes.controlPanelBtnFontSize}px;
    margin-bottom: 5px;
  }
  .group-item {
    min-height: 36px;
  }
  .button-wrapper {
    display: flex;
    gap: 10px;
    font-size: ${sizes.controlPanelBtnFontSize}px;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const StButtonControlPanel = styled.button`
  padding: 10px;
  color: white;
  border-radius: 5px;
  background-color: lightgray;
  cursor: pointer;
  &.active {
    cursor: pointer;
    background-color: ${colors.primaryColor};
    &.warning {
      background-color: ${colors.warningColor};
    }
  }
`;
