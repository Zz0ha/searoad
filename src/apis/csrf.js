// cross-site-request forgery get
export const getCSRF = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/csrf/`, {
    credentials: "include",
  }).then((response) => response.json());
  return res.resMsg.token;
};
