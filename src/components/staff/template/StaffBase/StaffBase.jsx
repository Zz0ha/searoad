import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import SideNavigator from 'components/staff/organism/SideNavigator';

import { getUserProfile } from 'apis/auth';

import { StDivContainerBody, StDivContainerBodyContent } from './StaffBase.style';

const StaffBase = (props) => {
  const { data } = useQuery('nickname', getUserProfile, {
    notifyOnChangeProps: 'tracked',
    staleTime: 1000*30,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    suspense: true,
  });
  const isStaff = data?.resMsg?.profile?.is_staff;
  if(!isStaff) {
    alert('권한이 없습니다. 로그인 페이지로 이동합니다.');
  }

  return (
    !isStaff ? <Navigate to="/auth" /> : (
      (
      <div>
        <StDivContainerBody>
          <SideNavigator />
          <StDivContainerBodyContent>
            <div className="title">
                {props.contentTitle}
            </div>
            <div className="body">
              {props.contentBody}
            </div>
          </StDivContainerBodyContent>
        </StDivContainerBody>
      </div>
      )
    )
  );
};

export default StaffBase;
