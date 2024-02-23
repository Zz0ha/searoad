import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

import { StTableMainContent } from 'styles/staff/MainContentTable.style';

export const StTableOrderGroup = styled(StTableMainContent)`
`;

export const StTrOrderGroupTableRow = styled.tr`
  td {
    &.confirm-cell {
      font-weight: bold;
    }
  }
`;

export const StSpanConfirmResult = styled.span`
  ${props =>
    props.resultType === 'pick' ? `
      color: ${colors.primaryColor};
    ` : props.resultType === 'update' ? `
      color: ${colors.greenColor};
    ` : props.resultType === 'create' ? `
      color: orange;
    ` : props.resultType === 'delete' ? `
      color: ${colors.dangerColor};
    ` : `
      color: ${colors.grayText};
      font-weight: normal;
    `
  }
`
