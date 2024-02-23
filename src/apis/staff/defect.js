import { getCSRF } from 'apis/csrf';

export const getDefectsAll = async (props) => {
  let {
    apiQueryStrings = {},
  } = props;

  const user_nickname = apiQueryStrings.userNickname;
  const states = apiQueryStrings.states;

  let queryString = '';

  if(user_nickname?.length > 0) {
    queryString = `?user_nickname=${user_nickname}`;
  }

  if(states?.length > 0) {
    const stateQueryString = states.join('&state=');
    queryString += queryString ? `&state=${stateQueryString}` : `?state=${stateQueryString}`;
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/defects/${queryString}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
  return response;
}


export const postDefectToReceived = async (props) => {
  let {
    apiPayload,
  } = props;

  const defectId = apiPayload.defectId;

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/defects/received/`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'defect_id': defectId,
      }),
    }
  );
  return response;
}


export const postDefectToConfirmed = async (props) => {
  let {
    apiQueryStrings = {},
    apiPayload,
  } = props;

  const {
    force = false,
  } = apiQueryStrings;

  const {
    defectId,
    isDefective,
    confirmDetail,
    defectiveQuantity,
    compensationType,
    compensationCost,
  } = apiPayload;

  let queryString = '';
  if(force) {
    queryString = '?force=true';
  }

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/defects/confirmed/${queryString}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'defect_id': defectId,
        'confirm_data': {
          'is_defective': isDefective,
          'confirm_detail': confirmDetail,
          'defective_quantity': defectiveQuantity,
          'compensation_type': compensationType,
          'compensation_cost': compensationCost,
        }
      }),
    }
  );
  return response;
}
