import styled from 'styled-components/macro';

import { StDivStaffModalContent } from 'styles/staff/Modal.style';

const openModalUserInfo = (modalOpen, setModalContent, modalContent) => {
  setModalContent(modalContent);
  modalOpen(true);
}

const StDivUserMarked = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const StDivUserMarkedModalContent = styled(StDivStaffModalContent)`
  text-align: left;
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .main-table {
    tbody tr {
      td {
        padding-bottom: 5px;
          &:first-child {
          padding-right: 20px;
          font-weight: bold;
        }
      }
    }
  }
`;

export const UserMarked = ({
  user_info,
  has_defect_bonus_product,
  modalOpen, setModalContent,
 }) => {
  const modalContent = (
    <StDivUserMarkedModalContent>
      <p className="title">User 정보</p>
      <table className="main-table">
        <tbody>
          <tr>
            <td>닉네임</td>
            <td>{user_info.nickname}</td>
          </tr>
          <tr>
            <td>(ID)</td>
            <td>{user_info.id}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{user_info.email}</td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>{user_info.contact_number}</td>
          </tr>
          <tr>
            <td>불량 보상 예정 상품</td>
            <td>
              {
                has_defect_bonus_product ?
                  <span style={{
                    color: "red",
                    fontWeight: "bold",
                  }}>있음</span> : <span>없음</span>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </StDivUserMarkedModalContent>
  )
  return (
    <StDivUserMarked
      onClick={() => openModalUserInfo(modalOpen, setModalContent, modalContent)}
    >
      <span>{user_info.nickname}</span>
      { has_defect_bonus_product ? <div className="badge-defect-bonus__small" /> : undefined }
    </StDivUserMarked>
  )
}
