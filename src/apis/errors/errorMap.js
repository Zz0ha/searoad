export const simpleSuccessAlert = (apiResponse) => {
  const status = apiResponse?.status;
  if(status && status < 300) {
    alert(`성공적으로 처리되었습니다. status: ${status}`);
  }
};

export const simpleErrorAlert = async (apiResponse) => {
  const status = apiResponse?.status;
  if(status && status >= 300) {
    console.log(apiResponse);
    const respData = await apiResponse.json();
    const resCode = respData?.resCode;
    let resMsgErrDetail;
    try {
      resMsgErrDetail = JSON.stringify(respData?.resMsg);
    } catch (e) {
      resMsgErrDetail = respData?.resMsg;
    }
    alert(`${errorCodeStringMap[resCode]}\nstatus: ${status}\nresCode: ${resCode}\nresMsgErrDetail: ${resMsgErrDetail}`);
    return false;
  }
  return true;
};

export const simpleAlert = async (apiResponse) => {
  simpleSuccessAlert(apiResponse);
  return simpleErrorAlert(apiResponse);
};

export const errorCodeStringMap = {
  "E-VLID-1000": "잘못된 입력입니다.",
  "E-VLID-1001": "이미 존재합니다.",
  "E-VLID-1002": "일치하지 않습니다.",
  "E-VLID-1003": "비밀번호 확인이 일치하지 않습니다.",
  "E-VLID-1004": "필수 입력 항목을 입력해주세요.",
  "E-VLID-1005": "만료되었습니다.",
  "E-C400-1000": "잘못된 요청입니다.",
  "E-C400-1001": "재고가 부족합니다.",
  "E-C400-1002": "구매할 수 없는 상품입니다.",
  "E-C400-1003": "사용할 수 없는 결제 수단입니다.",
  "E-C400-1004": "불가능한 요청입니다.",
  "E-C400-1005": "결제 트랜잭션이 종료되었습니다. 다시 시도해주세요.",
  "E-C400-1006": "결제 승인에 실패했습니다. 다시 시도해주세요.",
  "E-C400-1007": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  "E-C400-1008": "주문 상태가 올바르지 않습니다.",
  "E-C400-1009": "불량 주문을 찾을 수 없습니다.",
  "E-C400-1010": "이미 환불되었습니다.",
  "E-C400-1011": "필수 약관에 동의해주세요.",
  "E-C401-1000": "ID 또는 비밀번호가 올바르지 않습니다.",
  "E-C401-1001": "로그인이 필요합니다.",
  "E-C403-1000": "권한이 없습니다.",
  "E-C404-1000": "요청하신 내용을 찾을 수 없습니다. 새로고침 후 다시 시도해도 문제가 지속될 경우 고객센터로 문의해주세요.",
  "E-C405-1000": "요청하신 Http Method가 올바르지 않습니다.",
  "E-C406-1000": "요청하신 데이터 형식이 올바르지 않습니다.",
  "E-C415-1000": "요청하신 미디어 타입이 올바르지 않습니다.",
  "E-C429-1000": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
}
