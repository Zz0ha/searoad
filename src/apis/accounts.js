//중복확인 API

//아이디 중복확인
export const accountsVerificationUsername = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/username/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  return response;
};

//닉네임 중복확인
export const accountsVerificationNickname = async (nickname) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/nickname/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(nickname),
    }
  ).then((res) => res.json());

  return response;
};

// 이메일 / 연락처 중복확인
export const accountsVerificationExistence = async (targetUrl, targetPayload) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/${targetUrl}/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        mode: "exist",
        ...targetPayload,
      }),
    }
  );
  return response;
};

//이메일 인증요청
export const accountsVerificationsSendEmail = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/email/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  return response;
};

//이메일 인증완료
export const accountsVerificationsEmail = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/email/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  return response;
};

//핸드폰 인증요청
export const accountsVerificationsSendNumber = async (phoneData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/contact-number/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(phoneData),
    }
  ).then((res) => res.json());
  return response;
};

//핸드폰 인증
export const accountsVerificationsNumber = async (phoneData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/contact-number/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(phoneData),
    }
  ).then((res) => res.json());

  return response;
};

//회원가입 요청
export const fetchAccounts = async (allData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(allData),
    }
  ).then((res) => res.json());
  return response;
};
