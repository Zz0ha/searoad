import React from 'react';
import styled from 'styled-components/macro';

import StaffBase from 'components/staff/template/StaffBase';

import { simpleAlert } from 'apis/errors/errorMap';
import { getSchedulerJobs, shutdownScheduler, startScheduler } from 'apis/staff/scheduler';

const StStaffSchedulerWrapper = styled.div`
  width: 1370px;
  margin: auto;
  padding: 0 20px;
`;

const StStaffScheduler = styled.div`
  padding: 20px;
  .resp-board {
    margin: 20px 0;
    width: 100%;
    min-height: 500px;
    border: 1px solid #ccc;
  }
`;

const StSchedulerControllerGroup = styled.div`
  display: flex;
  gap: 10px;
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    color: white;
    &.green {
      background-color: rgba(0, 128, 0, 1);
    }
    &.primary {
      background-color: rgb(29, 83, 201);
    }
    &.danger {
      background-color: rgba(201, 29, 18, 1);
    }
  }
`;


const ContentTitle = () => {
  return (
    <>
      <h1>스케쥴러</h1>
      <p>스케쥴러 UI를 이용해서 API서버의 Batch Job을 스케쥴링 합니다.</p>
    </>
  )
}

const ContentBody = () => {
  const [respData, setRespData] = React.useState(null);

  return (
    <StStaffSchedulerWrapper>
      <StStaffScheduler>
        <StSchedulerControllerGroup>
          <button
            className="ctrl-btn green"
            onClick={(e) => {
              getSchedulerJobs().then((resp) => {
                if(simpleAlert(resp)) {
                  resp.json().then((resp) => {
                    setRespData(resp);
                  });
                }
              });
            }}
          >
            Get All Jobs
          </button>
          <button
            className="ctrl-btn primary"
            onClick={(e) => {
              startScheduler().then((resp) => {
                if(simpleAlert(resp)) {
                  getSchedulerJobs().then((resp) => resp.json().then((resp) => setRespData(resp)));
                }
              });
            }}
          >
            Start
          </button>
          <button
            className="ctrl-btn danger"
            onClick={(e) => {
              shutdownScheduler().then((resp) => {
                if(simpleAlert(resp)) {
                  resp.then((resp) => {
                    setRespData(resp);
                  });
                }
              });
            }}
          >
            Shutdown
          </button>
        </StSchedulerControllerGroup>
        <div className="resp-board">
        {
          respData ? (
            <pre>{JSON.stringify(respData, null, 2)}</pre>
          ) : (
            <p>응답 데이터가 없습니다.</p>
          )
        }
        </div>
      </StStaffScheduler>
    </StStaffSchedulerWrapper>
  );
};

export const StaffScheduler = (props) => {
  const mainClassName = 'scheduler';

  return (
    <StaffBase
      contentTitle={<ContentTitle />}
      contentBody={<ContentBody mainClassName={mainClassName} {...props} />}
    />
  )
}
