import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

export const StDivStaffModal = styled.div`
  .align-left {
    text-align: left;
  }
  td {
    &.pr-10 {
      padding-right: 10px;
    }
    textarea.textarea {
      padding: 5px;
      width: 100%;
      height: 50px;
      border: 1px solid ${colors.borderColor};
      text-align: left;
      vertical-align: top;
    }
  }
  .modal__buttons {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    .modal-cancel {
      margin-right: 10px;
    }
  }
`;

export const StDivStaffModalContent = styled.div``;
