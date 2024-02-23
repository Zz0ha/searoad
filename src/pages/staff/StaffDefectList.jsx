import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import ModalPortal from 'ModalPortal';
import { ModalFlexible } from 'components/ModalFlexible';
import StaffBase from 'components/staff/template/StaffBase';
import DefectControlPanel from 'components/staff/organism/DefectControlPanel';
import DefectTable from 'components/staff/organism/DefectTable';

import { modalFlexibleCloseBtnState, modalOpenState } from 'state';
import * as apiStaff from 'apis/staff';
import { simpleErrorAlert } from 'apis/errors/errorMap';


const getRefreshRawDefectsArr = (props) => {
  let {
    setRawDefectsArr,
  } = props;

  const closureFunction = (props) => {
    let {
      apiQueryStrings,
    } = props;

    apiStaff.getDefectsAll({apiQueryStrings: apiQueryStrings})
    .then((res) => {
      res.json().then((data) => {
        const defectArr = data.resMsg;
        setRawDefectsArr(defectArr);
      }
    )})
    .catch((err) => {
      simpleErrorAlert(err);
    });
  }

  return closureFunction;
}

const ContentTitle = (props) => {
  return (<>
    <h1>불량 검토</h1>
    <p>불량을 조회하고 처리합니다.</p>
  </>);
}

const ContentBody = (props) => {
  const mainClassName = 'defect-list';

  // 모달 State
  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const modalOpen = useSetRecoilState(modalOpenState);
  const [modalContent, setModalContent] = useState(null);

  // API에서 가져온 불량 목록
  const [rawDefectsArr, setRawDefectsArr] = useState([]);

  // API에서 가져와 정제한 불량 목록
  const [defectsArr, setDefectsArr] = useState([]);

  // 테이블 체크박스
  const [checkedDefectSet, setCheckedDefectSet] = useState(new Set());

  // API Fetch Options - 불량 목록 가져오기 (getDefectsAll)
  const [apiFetchOptionsGetDefectsAll, setApiFetchOptionsGetDefectsAll] = useState({
    apiQueryStrings: {},
  });

  // 불량 목록 가져오기
  useEffect(() => {
    // state setter를 가진 closure function을 useEffect에 넣어서 dependency를 없애고 무한 렌더링을 막는다.
    const refreshRawDefectsArr = getRefreshRawDefectsArr({
      setRawDefectsArr: setRawDefectsArr,
    });
    refreshRawDefectsArr(apiFetchOptionsGetDefectsAll);
  }, [apiFetchOptionsGetDefectsAll]);

  // 테이블 보이기용 불량 목록 정제
  useEffect(() => {
    setDefectsArr(rawDefectsArr);
  }, [rawDefectsArr]);

  const modalHandler = {
    modalOpen: modalOpen,
    setModalContent: setModalContent,
    setModalFlexibleCloseBtn: setModalFlexibleCloseBtn,
  }

  const apiHandler = {
    refreshRawDefectsArr: getRefreshRawDefectsArr({
      setRawDefectsArr: setRawDefectsArr,
    }),
    setRawDefectsArr: setRawDefectsArr,
    apiFetchOptionHandler: {
      getDefectsAll: {
        options: apiFetchOptionsGetDefectsAll,
        setOptions: setApiFetchOptionsGetDefectsAll,
      },
    },
  }

  return (
  <div className={`main-content__wrapper ${mainClassName}`}>
    <DefectControlPanel
      defectsArr={defectsArr}
      setDefectsArr={setDefectsArr}
      checkedDefectSet={checkedDefectSet}
      setCheckedDefectSet={setCheckedDefectSet}
      modalHandler={modalHandler}
      apiHandler={apiHandler}
    />
    <DefectTable
      mainClassName={mainClassName}
      defectsArr={defectsArr}
      setDefectsArr={setDefectsArr}
      checkedDefectSet={checkedDefectSet}
      setCheckedDefectSet={setCheckedDefectSet}
      modalHandler={modalHandler}
      apiHandler={apiHandler}
    />
    <ModalPortal>
      <ModalFlexible>
        {modalContent}
      </ModalFlexible>
    </ModalPortal>
  </div>)
}

export const StaffDefectList = (props) => {
  return (
    <StaffBase
      contentTitle={<ContentTitle {...props} />}
      contentBody={<ContentBody {...props} />}
    />
  );
}
