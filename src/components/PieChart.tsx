import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import "chartjs-plugin-labels"
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import { RankResult } from '../models/RankResult';

type wrapperProps = {
    size: number
}
type props = {
    rankList?:RankResult
}

const ScrollDiv = styled.div`
    overflow-x : auto;
`
const ChartWrapper = styled.div<wrapperProps>`
    width : ${props => props.size}px
`


const PieChart = ({rankList}:props) => {
    
    var resize = useSelector((state: StoreState) => state.Reducer.resizeOpt);
    var size = useSelector((state: StoreState) => state.Reducer.graphSize);

    const expData = {
        labels: ["1등", "2등","3등","4등","5등","꽝"],
        datasets: [
            {
                data: [rankList?.getFirst, rankList?.getFirst,rankList?.getThird,rankList?.getFourth,rankList?.getFifth,rankList?.getLast],
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor:
                    ["#fbc400", "#69c8f2", "#ff7272", "#b0d840", "#aaa"]
                ,
            }
        ]
    };
    


    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={size-1170}>
                <Doughnut
                    options={{
                        responsive: true,
                        legend: {
                            display: true,
                            position: "bottom",
                            labels : {
                                padding : 10,
                                boxWidth : 25,
                                fontStyle : "bold",
                                fontSize : 13

                            }
                        },

                        plugins: {
                            labels: [
                                {
                                    render: 'label',
                                    arc: true,
                                    position: 'outside',
                                    fontSize : 14,
                                    fontStyle: 'bold'
                                },
                                {
                                    render: 'percentage',
                                    fontSize : 14,
                                    fontStyle: 'bold'
                                }
                            ]
                        }
                    }}
                    redraw={resize}
                    data={expData}
                    height={95}
                    width={100}
                />
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default PieChart
