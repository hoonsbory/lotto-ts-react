import { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { StoreState } from '../store'

type wrapperProps = {
    size: number
}


const ChartWrapper = styled.div<wrapperProps>`
    width : ${props => props.size}px
`
const ScrollDiv = styled.div`
    overflow-x : auto;
`

const Chart = () => {
    var list = useSelector((state: StoreState) => state.Reducer.accumulateList);
    var resize = useSelector((state: StoreState) => state.Reducer.resizeOpt);
    var size = useSelector((state: StoreState) => state.Reducer.graphSize);


    const expData = {
        labels: list.map(x => `${x[0]}번`),
        datasets: [
            {
                data: list.map(x => x[1]),
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor:
                    list.map(x => {
                        if (x[0] < 11) return "#fbc400"
                        else if (x[0] < 21) return "#69c8f2"
                        else if (x[0] < 31) return "#ff7272"
                        else if (x[0] < 41) return "#aaa"
                        else return "#b0d840"
                    })
                ,
            }
        ]
    };



    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={size}>
                    <Bar
                        options={
                            {
                                plugins : {
                                    labels: [
                                        {
                                        render: 'value',
                                        fontStyle : "bold"
                                      },
                                    ]
                                },
                                maintainAspectRatio: false,
                                legend: {
                                    display: false
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            suggestedMax: list.length >0 ? list[0][1] + list[0][1]*0.1 : 0,
                                            beginAtZero: true
                                        }
                                    }],
                                }
                            }
                        }
                        redraw={resize}
                        data={expData}
                        height={300}
                        width={100}
                    />
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default Chart
