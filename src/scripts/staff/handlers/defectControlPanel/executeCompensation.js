import { simpleAlert } from 'apis/errors/errorMap';
import * as apiStaff from 'apis/staff/index';

export const executeCompensation = (props) => {
  let {
    checkedDefectSet,
    btnActive,
  } = props;

  if(!btnActive.confirm || checkedDefectSet.size === 0) {
    return;
  } else if(checkedDefectSet.size > 1) {
    alert('한번에 하나의 보상만 실행 할 수 있습니다.');
    return;
  }

  const defectId = Array.from(checkedDefectSet)[0];

  apiStaff.postPaymentRefundOfDefect({
    apiPayload: {
      defectId: defectId,
    },
  })
  .then((res) => simpleAlert(res));
}
