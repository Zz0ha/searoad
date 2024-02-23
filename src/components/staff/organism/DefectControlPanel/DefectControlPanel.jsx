import React, { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import {
  receiveDefect,
  confirmDefect,
  executeCompensation,
} from 'scripts/staff/handlers/defectControlPanel/index';

import { StButtonControlPanel, StDivControlPanelButtonGroup } from 'styles/staff/ControlPanel.style';
import {
  StDivDefectControlPanel,
  StButtonUserNickSearch,
  StInputUserNickSearch,
  StButtonDefectStateFilter,
  StButtonDefectStateFilterSearch,
  StButtonDefectReviewExecute,
} from './DefectControlPanel.style';

const DefectControlPanel = (props) => {
  const {
    defectsArr,
    checkedDefectSet,
    setCheckedDefectSet,
    modalHandler,
    apiHandler,
  } = props;

  const [searchUserNickname, setSearchUserNickname] = useState('');
  const [defectFilterSet, setDefectFilterSet] = useState(new Set());
  const [defectReviewBtnActive, setDefectReviewBtnActive] = useState({
    receive: false,
    confirm: false,
  });

  const filterBtnsInfo = {
    received: {
      btnClassName: 'received',
      btnText: '접수완료',
      defectState: 'RECEIVED',
    },
    confirmed: {
      btnClassName: 'confirmed',
      btnText: '검토완료',
      defectState: 'CONFIRMED',
    },
    preresolved: {
      btnClassName: 'preresolved',
      btnText: '보상예정',
      defectState: 'PRERESOLVED',
    },
    resolved: {
      btnClassName: 'resolved',
      btnText: '처리완료',
      defectState: 'RESOLVED',
    },
  };

  const reviewFuncAttrs = {
    defectsArr: defectsArr,
    checkedDefectSet: checkedDefectSet,
    setCheckedDefectSet: setCheckedDefectSet,
    btnActive: defectReviewBtnActive,
    modalHandler: modalHandler,
    apiHandler: apiHandler,
  };

  useEffect(() => {
    if(checkedDefectSet.size < 1) {
      setDefectReviewBtnActive({
        receive: false,
        confirm: false,
        execute: false,
      })
    } else if (checkedDefectSet.size === 1) {
      setDefectReviewBtnActive({
        receive: true,
        confirm: true,
        execute: true,
      });
    } else {
      setDefectReviewBtnActive({
        receive: true,
        confirm: false,
        execute: false,
      });
    }
  }, [checkedDefectSet]);

  return (
    <StDivDefectControlPanel>
      <StDivControlPanelButtonGroup className="user-nickname-search">
        <div className="group-title"><b>유저 닉네임 검색</b>:</div>
        <div className="group-item">
          <StInputUserNickSearch
            type="text"
            placeholder="유저 닉네임"
            value={searchUserNickname}
            onChange={(e) => setSearchUserNickname(e.target.value)}
          ></StInputUserNickSearch>
          <StButtonUserNickSearch
            onClick={() => {
              const targetOptionHandler = apiHandler.apiFetchOptionHandler.getDefectsAll
              const newTargetOptions = {
                ...targetOptionHandler.options,
                apiQueryStrings: {
                  ...targetOptionHandler.options.apiQueryStrings,
                  userNickname: searchUserNickname,
                }
              }
              targetOptionHandler.setOptions(newTargetOptions);

              // Hint:
              // 아래와 같은 직접 api 호출 방식도 사용할 수 있으나, setState가 비동기적으로 동작하므로
              // 후에 예상치못한 오류 상황을 발생시킬 수도 있을 것 같다.
              // 따라서 useEffect를 이용해서 state를 추적하다가 변경시 api 호출을 하는 방식을 사용하는 것이 좋을 것 같다.
              // apiHandler.refreshRawDefectsArr(newTargetOptions);
            }}
          >
            <AiOutlineSearch />검색
          </StButtonUserNickSearch>
        </div>
      </StDivControlPanelButtonGroup>

      <StDivControlPanelButtonGroup className="defect-state-filter">
        <div className="group-title"><b>불량 상태 필터:</b> (검색을 누르지 않으면 반영되지 않음)</div>
        <div className="group-item button-wrapper">
          {Object.keys(filterBtnsInfo).map((key) => {
            const { btnClassName, btnText, defectState } = filterBtnsInfo[key];
            return (
              <StButtonDefectStateFilter
                key={key}
                className={`${btnClassName} ${defectFilterSet.has(defectState) ? 'active' : ''}`}
                onClick={() => {
                  if (defectFilterSet.has(defectState)) {
                    defectFilterSet.delete(defectState);
                  } else {
                    defectFilterSet.add(defectState);
                  }
                  setDefectFilterSet(new Set(defectFilterSet));
                }}
              >
                {btnText}
              </StButtonDefectStateFilter>
            );
          })}
          <StButtonDefectStateFilterSearch
            onClick={() => {
              const targetOptionHandler = apiHandler.apiFetchOptionHandler.getDefectsAll
              const newTargetOptions = {
                ...targetOptionHandler.options,
                apiQueryStrings: {
                  ...targetOptionHandler.options.apiQueryStrings,
                  states: Array.from(defectFilterSet),
                }
              }
              targetOptionHandler.setOptions(newTargetOptions);
            }}
          >
            <AiOutlineSearch />검색
          </StButtonDefectStateFilterSearch>
        </div>
      </StDivControlPanelButtonGroup>

      <StDivControlPanelButtonGroup className="defect-review-btn">
        <div className="group-title"><b>불량 검토:</b></div>
        <div className="group-item button-wrapper">
          <StButtonControlPanel
            className={`receive ${defectReviewBtnActive.receive ? 'active' : ''}`}
            onClick={() => receiveDefect(reviewFuncAttrs)}
          >
            신고접수 받기
          </StButtonControlPanel>

          <StButtonControlPanel
            className={`confirm ${defectReviewBtnActive.confirm ? 'active' : ''}`}
            onClick={() => confirmDefect(reviewFuncAttrs)}
          >
            검토결과 작성
          </StButtonControlPanel>

          <StButtonDefectReviewExecute
            className={`${defectReviewBtnActive.execute ? 'active' : ''} warning`}
            onClick={() => executeCompensation(reviewFuncAttrs)}
          >
            보상 실행하기
          </StButtonDefectReviewExecute>
        </div>
      </StDivControlPanelButtonGroup>
    </StDivDefectControlPanel>
  );
}

export default DefectControlPanel;
