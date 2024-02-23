import { getCSRF } from 'apis/csrf';

export const getHitStatistics = async (props = {}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/statistics/hits/`,
    {
      credentials: 'include',
    }
  ).then((response) => response.json());
  return response;
}

export const postUserHit = async (props = {}) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/statistics/hits/`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      body: JSON.stringify({
        'subject_type': 'user',
      }),
    }
  ).then((response) => response.json());
  return response;
}

// export const postHitFromStaff = async (props = {}) => {
//   let {
//     subject_type = '',
//     hit_count = '',
//   } = props;

//   const token = await getCSRF();
//   const response = await fetch(
//     `${process.env.REACT_APP_API_URL}/api/v1/staff/statistics/hits/`,
//     {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': token,
//       },
//       body: JSON.stringify({
//         'subject_type': subject_type,
//         'hit_count': hit_count,
//       }),
//     }
//   ).then((response) => response.json());
//   return response;
// }
