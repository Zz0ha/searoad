import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery("nickname");
  const userLogin = data.resMsg.profile.nickname;
  if(isLoading){
    return <Loading />
  }
  return (
    <>
    {
      userLogin === null ? navigate('/auth', {state:pathname, replace: true}): children
    }
    </>
  )
}

export default AuthLayout;
