export const getUseTerm = async (data = {}) => {
  let {
    respType = '',
  } = data;

  let queryString = '';
  if(respType === 'html') {
    queryString = '?respType=html';
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/terms/use-term/${queryString}`,
    {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  return response;
};


export const getPrivacyTerm = async (data = {}) => {
  let {
    respType = '',
  } = data;

  let queryString = '';
  if(respType === 'html') {
    queryString = '?respType=html';
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/terms/privacy-term/${queryString}`,
    {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  return response;
};
