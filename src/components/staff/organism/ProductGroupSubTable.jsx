import React from 'react';
import styled from 'styled-components/macro';

import * as constSet from 'constants/index';
import { reverseFindConstantText } from 'scripts/helpers/common';

import colors from 'styles/variables/colors';

const StyledProductGroupSubTable = styled.div`
  table {
    margin-bottom: 5px;
    td {
      padding: 0 10px;
      min-width: 80px;
      &:first-child {
        padding-left: 0;
      }
      &.field__name {
        text-align: right;
        &.id {
          text-align: center;
        }
      }
      &.field__value {
        border-right: 1px solid ${colors.borderColor};
        text-align: center;
      }
      .volume-unit {
        color: ${colors.primaryColor};
        font-weight: bold;
      }
    }
  }
`;

export default function ProductGroupSubTable ({
  productGroup,
}) {
  return (
    <StyledProductGroupSubTable>
      <table>
        <tbody>
          <tr className="row id">
            <td className="field__name id">ID:</td>
            <td className="field__value">{productGroup.id}</td>
            <td className="field__name">카테고리:</td>
            <td className="field__value">
              {reverseFindConstantText(constSet.ProductCategoryArr, productGroup.category)}
            </td>
          </tr>
          <tr className="pg-row">
            <td className="field__name">원산지:</td>
            <td className="field__value">{productGroup.origin_country}</td>
            <td className="field__name">생산방식:</td>
            <td className="field__value">
              {reverseFindConstantText(constSet.ProductionTypeArr, productGroup.production_type)}
            </td>
            <td className="field__name">보존방식:</td>
            <td className="field__value">
              {reverseFindConstantText(constSet.PreservationTypeArr, productGroup.preservation_type)}
            </td>
          </tr>
          <tr className="pg-row">
            <td className="field__name">판매단위:</td>
            <td className="field__value">
              1 <span className="volume-unit">{reverseFindConstantText(constSet.VolumeCodeArr, productGroup.volume_code)}</span> 당
            </td>
            <td className="field__name">통화:</td>
            <td className="field__value">
              {reverseFindConstantText(constSet.CurrencyCodeArr, productGroup.currency_code)}
            </td>
          </tr>
        </tbody>
      </table>
    </StyledProductGroupSubTable>
  );
}
