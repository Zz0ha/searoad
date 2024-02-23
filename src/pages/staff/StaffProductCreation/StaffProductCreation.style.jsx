import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

export const StDivStaffProductCreation = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const StDivCreationFormWrapper = styled.div`
  width: 1000px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 40px;
`;

export const StTableFormTable = styled.table`
  width: 100%;
`;

export const StTrFormRow = styled.tr`
  &.product-section-div {
    color: ${colors.primaryColor};
    font-size: 12px;
  }
  td {
    padding-top: 10px;
    padding-bottom: 10px;
    &:first-child {
      padding-right: 30px;
    }
    &.continuous-row {
      padding-top: 0;
    }
    &.thumbnail-preview-row {
      text-align: center;
    }
    input, .min-size-of-entity, .max-size-of-entity {
      min-height: 25px;
      border: 1px solid ${colors.borderColor};
      border-radius: 2px;
    }
  }
`;

export const StTrFormRowDivider = styled.tr`
  td div {
    border-bottom: 1px solid #ddd;
    margin: 20px 0;
  }
`;

export const StInputThumbnailUrl = styled.input`
  width: 100%;
  padding: 2px;
  border: 1px solid ${colors.borderColor};
`;

export const StButtonPrimary = styled.button`
  background-color: ${colors.primaryColor};
  padding: 10px;
  margin: 0 10px;
  border-radius: 8px;
  color: white;
  font-weight: 700;
`;
