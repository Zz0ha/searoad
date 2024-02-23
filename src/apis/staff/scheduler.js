import { getCSRF } from 'apis/csrf';

export const getSchedulerJobs = async (props = {}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/scheduler/?command=list_jobs`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  return response;
}

export const startScheduler = async (props = {}) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/scheduler/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'command': 'start',
      }),
    }
    );
    return response;
  }

export const shutdownScheduler = async (props = {}) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/scheduler/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'command': 'shutdown',
      }),
    }
  );
  return response;
}
