import styled from 'styled-components/macro';

export const StDivContainerBody = styled.div`
  display: flex;
  position: relative;
`;

export const StDivContainerBodyContent = styled.div`
  width: 100%;
  padding: 20px;
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px 0;
    padding-right: 50px;
    text-align: center;
    gap: 10px;
  }
  .body {
    width: 100%;
    padding-right: 40px;
  }
`;
