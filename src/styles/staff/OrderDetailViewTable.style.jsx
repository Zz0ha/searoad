import styled from 'styled-components/macro';

export const StTableOrderDetailValue = styled.table`
  width: 100%;
  tr:not(:first-child) {
    td {
      border-top: 1px solid black;
      &.value-code-cell {
        border: none;
      }
    }
  }
  tr {
    td {
      border: none;
      &.final-bill {
        border-top: 2px solid blue;
      }
    }
  }
  .value-title {
    &.final-bill {
      font-weight: bold;
    }
    .modifier {
      font-size: .8em;
    }
  }
  .value-cell {
    text-align: right;
  }
  .value-code-cell {
    padding-left: 4px;
  }
`;
