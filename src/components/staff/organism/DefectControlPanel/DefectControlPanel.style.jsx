import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

import {
  StDivControlPanel,
  StDivControlPanelButtonGroup,
  StButtonControlPanel,
} from 'styles/staff/ControlPanel.style';

export const StDivDefectControlPanel = styled(StDivControlPanel)``;

export const StDivButtonGroupUserNickSearch = styled(StDivControlPanelButtonGroup)``;

export const StInputUserNickSearch = styled.input`
  border: 1px solid ${colors.borderColor};
  background-color: white;
  font-size: 15px;
  padding: 5px;
`;

export const StButtonDefectControlPanel = styled(StButtonControlPanel)`
  &.active {
    &.defect-list__control-panel__btn {
      background-color: ${colors.primaryColor};
    }
  }
`;

export const StButtonUserNickSearch = styled(StButtonControlPanel)`
  padding: 2px;
  margin-left: 10px;
  background-color: transparent;
  color: ${colors.primaryColor};
  font-weight: bold;
  font-size: 15px;
`;

export const StButtonDefectStateFilter = styled(StButtonControlPanel)``;

export const StButtonDefectStateFilterSearch = styled(StButtonControlPanel)`
  padding: 2px;
  margin-left: 10px;
  background-color: transparent;
  color: ${colors.primaryColor};
  font-weight: bold;
  font-size: 15px;
`;

export const StButtonDefectReviewExecute = styled(StButtonControlPanel)`
  margin-left: 40px;
`;
