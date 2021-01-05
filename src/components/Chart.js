import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { StoreState } from '../store'
import Chart2 from 'chart.js'



const ChartWrapper = styled.div`
    width : ${props => props.size}px
`
const ScrollDiv = styled.div`
    overflow-x : auto;
`

const Chart = () => {
    var list = useSelector((state) => state.Reducer.accumulateList);
    var resize = useSelector((state) => state.Reducer.resizeOpt);
    var size = useSelector((state) => state.Reducer.graphSize);
    const [chart ,setChart] = useState()

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
    useEffect(() => {
        if(list.length===0) return
        if(chart) chart.destroy()

        var ctx = document.getElementById('chartFixedTooltips').getContext('2d');
        
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
        var chartjs = new Chart2(ctx, {
            type: 'bar',
            data: {
                labels: list.map(x => `${x[0]}번`),
                datasets: [{
                    label: 'Chart Graph',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: gradientFill,
                    data: list.map(x => x[1]),
                    pointBorderWidth: 10,
                    hoverBorderWidth: 13,


                }]
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                easing: "easeInOutBack"
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                plugins:{
                    labels : {
                        render : 'value'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            suggestedMax: list.length >0 ? list[0][1] + list[0][1]*0.1 : 0,
                        },
                        

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                scaleShowLabelBackdrop: true,
                showAllTooltips: true,
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return;
                        },
                        label: function (tooltipItem, data) {
                            return data['labels'][tooltipItem['index']] + " - " + data['datasets'][0]['data'][tooltipItem['index']] + "회 당첨";
                        },
                    }
                },
            } 
        });

        setChart(chartjs)
    }, [list,resize])


    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={size}>
                    {/* <Bar
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
                    /> */}
                    <canvas height="300px" id="chartFixedTooltips"></canvas>
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default Chart
