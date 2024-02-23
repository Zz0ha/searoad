import { getHitStatistics } from 'apis/statistics';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import colors from 'styles/variables/colors';

const MainStatisticsWrap = styled.div`
  width: 1370px;
  margin: 30px auto;
`;

const MainStatisticsCardGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 300px;
`;

const MainStatisticsCard = styled.div`
  width: 140px;
  text-align: center;
  .hit-number {
    color: ${colors.primaryColor};
    font-size: 70px;
    font-weight: bold;
    text-shadow: 3px 5px 10px rgba(0, 0, 0, .3)
  }
  .underline {
    width: 100%;
    height: 2px;
    position: relative;
    &::after {
      background: linear-gradient(to right, transparent 0%, #ffd700 50%, transparent 100%);
      position: absolute;
      height: 3px;
      bottom: 0;
      left: 0;
      width: 100%;
      content: '';
    }
  }
  .hit-desc {
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export function MainStatistics(props) {
  const [userHit, setUserHit] = useState(0);
  const [shopHit, setShopHit] = useState(0);

  useEffect(() => {
    getHitStatistics().then((res) => {
      setUserHit(res.resMsg?.user ?? 0);
      setShopHit(res.resMsg?.shop ?? 0);
    });
  }, []);

  return (
    <MainStatisticsWrap>
      <MainStatisticsCardGroup>

        {/* Version 1 */}
        <MainStatisticsCard>
          <div className="hit-number">{userHit}</div>
          <div className="underline"></div>
          <div className="hit-desc">누적 방문자수</div>
        </MainStatisticsCard>

        <MainStatisticsCard>
          <div className="hit-number">{shopHit}</div>
          <div className="underline"></div>
          <div className="hit-desc">제휴업체수</div>
        </MainStatisticsCard>

      </MainStatisticsCardGroup>
    </MainStatisticsWrap>
  );
}
