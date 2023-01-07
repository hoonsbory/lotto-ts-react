import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import ButtonGroup from './ButtonGroup';
import styled from 'styled-components';
import LineDiv from './LineDiv';
import { Debounce } from '../Debounce';
import PieChart from './LineChart';
import { useSelector } from 'react-redux';
import { StoreState } from '../store';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../store/ChartStore';
import Button from './Button';
import Arrow from './Arrow';
//유저들의 로또 결과를 보여주는 그래프

const FlexDiv = styled.div`
  display: inline-flex;
  line-height: 1;
  margin-right: 10px;
`;

const Span = styled.span`
  font-size: 0.8em;
  color: gray;
  margin-right: 10px;
  margin-top: 10px;
  word-break: keep-all;
`;

const UserChart = () => {
  const { sortBtn, userChartSum, userChartList, chartMainData } = useSelector(
    (state: StoreState) => state.ChartReducer,
  );

  const dispatch = useDispatch();

  const setMainList = (value: any) =>
    dispatch(actionCreators.setChartMainData(value));

  const setSortBtn = () => dispatch(actionCreators.setSortBtn());

  useEffect(() => {
    if (btnSelect[0]) {
      if (sortBtn) {
        setMainList([...userChartSum.sort((a: any, b: any) => a[1] - b[1])]);
      } else {
        setMainList([...userChartSum.sort((a: any, b: any) => b[1] - a[1])]);
      }
    } else {
      if (sortBtn) {
        setMainList([...userChartList.sort((a: any, b: any) => a[1] - b[1])]);
      } else
        setMainList([...userChartList.sort((a: any, b: any) => b[1] - a[1])]);
    }
  }, [userChartSum]);

  //버튼 토글
  const [btnSelect, setBtnSelect] = useState<boolean[]>([true, false]);

  //버튼 클릭 이벤트
  const selected = (idx: number) => {
    btnSelect[idx] = true;
    setBtnSelect(
      btnSelect.map((i, idx2) => {
        if (idx2 === idx) return true;
        else return false;
      }),
    );
  };

  const rankChart = Debounce((idx: number) => {
    if (btnSelect[idx]) return;
    selected(idx);
    if (sortBtn)
      setMainList([...userChartSum.sort((a: any, b: any) => a[1] - b[1])]);
    else setMainList([...userChartSum.sort((a: any, b: any) => b[1] - a[1])]);
  }, 200);

  const winNumChart = Debounce((idx: number) => {
    if (btnSelect[idx]) return;
    if (sortBtn)
      setMainList([...userChartList.sort((a: any, b: any) => a[1] - b[1])]);
    else setMainList([...userChartList.sort((a: any, b: any) => b[1] - a[1])]);
    selected(idx);
  }, 200);

  //정렬
  const sort = Debounce(() => {
    if (sortBtn) {
      setSortBtn();
      setMainList([...chartMainData.sort((a: any, b: any) => b[1] - a[1])]);
    } else {
      setSortBtn();
      setMainList([...chartMainData.sort((a: any, b: any) => a[1] - b[1])]);
    }
  }, 200);

  return (
    <div>
      <LineDiv
        content={
          <FlexDiv>
            <Span>가상 로또</Span>
            <ButtonGroup
              id={['userGraphBtn1', 'userGraphBtn2']}
              content={['당첨 비율', '당첨 번호(3등 ↑)']}
              selected={btnSelect}
              click={[rankChart, winNumChart]}
            ></ButtonGroup>
            <Button
              border={true}
              click={sort}
              hoverBg="rgb(224,230,251)"
              bg="white"
              content={<Arrow fill="rgb(86,115,235)" upDown={sortBtn}></Arrow>}
            ></Button>
          </FlexDiv>
        }
      ></LineDiv>

      {btnSelect[0] ? <PieChart></PieChart> : <Chart></Chart>}
    </div>
  );
};

export default UserChart;
