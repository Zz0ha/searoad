import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

import {
  StDivControlPanel,
  StDivControlPanelButtonGroup,
  StButtonControlPanel,
} from 'styles/staff/ControlPanel.style';

export const StDivConfirmedOrderControlPanel = styled(StDivControlPanel)``;

export const StButtonConfirmedOrderControlPanel = styled(StButtonControlPanel)`
  &.active {
    background-color: ${colors.greenColor};
  }
`;

export const StDivUserNickNameSearchButtonGroup = styled(StDivControlPanelButtonGroup)``;

export const StInputUserNickNameSearch = styled.input`
  border: 1px solid ${colors.borderColor};
  background-color: white;
  font-size: 15px;
  padding: 5px;
  `;

export const StButtonUserNickNameSearch = styled(StButtonConfirmedOrderControlPanel)`
  padding: 2px;
  margin-left: 10px;
  background-color: transparent;
  color: ${colors.primaryColor};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  `;

export const StDivOrderStatusReadFilterButtonGroup = styled(StDivControlPanelButtonGroup)``;

export const StDivButtonOrderStatusReadFilter = styled(StButtonControlPanel)`
  cursor: pointer;
  &.active {
    background-color: ${colors.primaryColor};
  }
`;

export const StDivButtonOrderStatusReadFilterSearch = styled(StDivButtonOrderStatusReadFilter)`
  padding: 2px;
  margin-left: 10px;
  background-color: transparent;
  color: ${colors.primaryColor};
  font-weight: bold;
  font-size: 15px;
`;

export const StDivOrderStatusChangeGroup = styled(StDivControlPanelButtonGroup)``;

export const StyledButtonOrderStatusChange = styled(StButtonConfirmedOrderControlPanel)`
  &.active.warning {
    background-color: ${colors.warningColor};
  }
`;
