import React from 'react';
import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';
import { formatAccountNumber } from 'scripts/utils';

const StyledPaymentGuideModal = styled.div`
  .modal-title {
    margin-bottom: 20px;
  }
  .modal-sub_description {
    margin: 20px 0 0;
  }
  .price-value {
    color: ${colors.primaryColor};
  }
  table {
    margin: 30px auto 0;
    th {
      background-color: ${colors.tableHeaderColor};
    }
    th, td {
      padding: 10px 20px;
      border: 1px solid ${colors.borderColor};
    }
  }
  .footerComment {
    margin: 30px 0 0;
    font-size: 12px;
    line-height: 1.5;
    color: ${colors.grayText};
  }
`;

export const PaymentGuideModal = (props) => {
  return (
    <StyledPaymentGuideModal>
      <h2 className="modal-title">결제 안내</h2>
      <h3 className="price">총 결제금액: <span className="price-value">{formatAccountNumber(props.orderGroup.total_price_to_pay)} 원</span></h3>
      <div className="modal-sub_description">
        아래의 계좌로 송금해주시면 입금자명 확인 후 결제 완료 알림을 드립니다.
      </div>
      <table>
        <thead>
          <tr>
            <th className="header bankName">은행명</th>
            <th className="header accountNumber">계좌번호</th>
            <th className="header owner">예금주</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="body bankName">하나은행</td>
            <td className="body accountNumber">217-910022-42604</td>
            <td className="body owner">(주)모세피플</td>
          </tr>
        </tbody>
      </table>
      <p className="footerComment">
        결제 시스템을 개편하고 있습니다.<br/>
        신용카드, 간편결제, 실시간 이체 등 다양한 결제수단을 지원할 예정입니다.<br/>
        고객님의 더 나은 이용 경험을 위해 언제나 노력하는 바닷길이 되겠습니다.
      </p>
    </StyledPaymentGuideModal>
  );
}
