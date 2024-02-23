import { simpleErrorAlert } from 'apis/errors/errorMap';
import * as apiStaff from 'apis/staff/index';

export const receiveDefect = (props) => {
  let {
    checkedDefectSet,
    setCheckedDefectSet,
    apiHandler,
  } = props;

  const defectIds = Array.from(checkedDefectSet);

  defectIds.forEach((defectId) => {
    apiStaff.postDefectToReceived({
      apiPayload: {
        defectId: defectId
      }
    })
    .then((response) => {
      if(response.status >= 300) {
        simpleErrorAlert(response);
      } else {
        setCheckedDefectSet(new Set());
        apiHandler.refreshRawDefectsArr({
          apiQueryParams: {},
        });
      }
    })
    .catch((response) => {
      simpleErrorAlert(response);
    });
  });
}
