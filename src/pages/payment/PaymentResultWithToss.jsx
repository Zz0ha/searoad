import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { getPaymentResult } from 'apis/payment';

const StyledPaymentResultWithToss = styled.div`
  padding: 100px 0;
  margin: auto;
  width: 1024px;
  p {
    padding: 5px;
  }
  .noti-title {
    padding-bottom: 50px;
    text-align: center;
  }
  .noti-sub-title {
    text-align: center;
  }
  .noti-sub-description {
    margin: auto;
    width: 100%;
    max-width: 700px;
  }
  .invoice-title {
    font-size: 16px;
    margin-top: 40px;
    text-align: center;
  }
  .invoice-table {
    margin: auto;
    border-collapse: collapse;
  }
  .invoice-table__meta-info {
    margin: 10px auto;
  }
  .invoice-table__price-info {
    margin: 10px auto 40px auto;
  }
  .invoice-row__head {
    background-color: #f5f5f5;
    min-width: 120px;
    padding: 10px;
    text-align: center;
  }
  tr.title-row td {
    background-color: white;
  }
  .invoice-row__body {
    background-color: #fcfcfc;
    min-width: 350px;
    padding: 10px;
    font-size: 13px;
  }
  .no-padding {
    padding: 0;
  }
  .order-list-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 13px;
  }
  .order-list-row__head {
    background-color: #fcfcfc;
    padding: 10px;
    text-align: center;
  }
  .order-list-row__body {
    background-color: #fcfcfc;
    padding: 10px;
    text-align: center;
  }
  .price-cell {
    text-align: right;
  }
  .primary-price {
    color: #1c53c7;
    font-weight: bold;
    font-size: 1.2em;
  }
  .home-btn__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .home-btn {
    background-color: #1c53c7;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const PaymentsResultWithToss = () => {
  const [ searchParams ] = useSearchParams();

  const pgid = searchParams.get('pgid');
  const [htmlContent, setHtmlContent] = useState(null);

  getPaymentResult({paymentGroupId: pgid}).then((res) => {
    setHtmlContent(res.resMsg?.html_content)
  })

  return (
    <StyledPaymentResultWithToss
      dangerouslySetInnerHTML={{'__html': htmlContent}}
    />
  );
}
