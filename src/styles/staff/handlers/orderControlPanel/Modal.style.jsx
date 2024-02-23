import styled from 'styled-components/macro';

import { StDivStaffModal } from 'styles/staff/Modal.style';

export const StDivConfirmOrderModal = styled(StDivStaffModal)`
  text-align: left;
  .modal__header {
    display: flex;
    justify-content: center;
    align-items: center;
    .modal__title {
      font-weight: bold;
    }
  }
  .modal__body {
    .modal__search-product {
      margin-bottom: 20px;
    }
    .modal__searched-product-list {
      text-align: left;
      margin-bottom: 20px;
    }
    .selected-product__title {
      font-weight: bold;
    }
  }
`;
