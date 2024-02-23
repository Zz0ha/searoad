import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

export const StWrapper = styled.div`
  width: 150px;
  padding: 10px 0;
  margin: 20px;
`;

export const StUlNavigator = styled.ul`
  position: sticky;
  top: 160px;
  `;

export const StLiNavigatorItem = styled.li`
  border-bottom: 1px solid ${colors.borderColor};
  &:first-child {
    padding-top: 10px;
    border-top: 1px solid ${colors.borderColor};
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  span.text {
    white-space: nowrap;
  }
  span.title {
    font-weight: bold;
    font-size: 19px;
    color: ${colors.primaryColor};
  }
`;

export const StUlSubNavigator = styled.ul`
  text-align: right;
`;

export const StLiSubNavigatorItem = styled.li`
  margin: 5px 0;
`;
