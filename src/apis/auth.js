import { getCSRF } from "../apis/csrf";

//로그인
export const fetchLogin = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/login/`,
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

//로그아웃
export const fetchLogout = async () => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/logout/`,
    {
      method: "POST",
      headers: {
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: "",
    }
  ).then((res) => {res.json()});
  return response;
};

// 프로필
export const getUserProfile = async () => {
  const resp = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/?target=all`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return resp;
};

// FIXME: profile 정보로부터 nickname을 가져오는 함수여야 함
//login상태 확인 GET nickname
export const getNickname = getUserProfile;

//계정찾기
export const findAccount = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/missing/`,
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

//비밀번호 재확인
export const reconfirmAuth = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/access-permission/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  //data = {secret_type:"password", secret:"본인pw"}
  return response;
};

//비밀번호 수정
export const changePW = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/?target=password`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  //data = {token:"비밀번호재확인토큰", current_password:"현재 비밀번호", new_password:"변경할 비밀번호"}
  return response;
};

//프로필 수정 이메일 인증
export const changeSendEmail = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/email/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  return response;
};

//수정 이메일 인증완료
export const changeVerificationsEmail = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/email/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());

  return response;
};

//핸드폰번호 수정 인증요청
export const changeSendNumber = async (phoneData) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/contact-number/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(phoneData),
    }
  ).then((res) => res.json());
  return response;
};

//핸드폰번호 수정 인증완료
export const changeVerificationsNumber = async (phoneData) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/contact-number/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(phoneData),
    }
  ).then((res) => res.json());

  return response;
};

//닉네임 수정 중복확인
export const changeNickname = async (nickname) => {
   const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/verifications/nickname/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(nickname),
    }
  ).then((res) => res.json());

  return response;
};

//프로필 수정
export const changeProfile = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/?target=profile`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  //data = {token, email, email_token, set_default_email, contact_number, contact_number_token, set_contact_number, nickname, first_name, last_name}
  
  return response;
};


//계정탈퇴
export const deleteUser = async (data)=>{
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/accounts/leave/`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => res);
  //data = {confirm_msg: "영구삭제" input으로 작성 받아야함}
  return response;
}