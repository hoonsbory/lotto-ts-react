import { useState, useEffect } from 'react'
import "chartjs-plugin-labels"
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import Chart from 'chart.js';

//Line차트
const ScrollDiv = styled.div`
    overflow-x : auto;
`
const ChartWrapper = styled.div`
    width : ${props => props.size}px
`


const PieChart = ({ rankList }) => {

    var size = useSelector((state) => state.Reducer.graphSize);
    const [list2 ,setList2] = useState()
    const [size2 ,setSize2] = useState()
    const [chart ,setChart] = useState()


    
    
    var labels = ["1등", "2등", "3등", "4등", "5등", "꽝"]
    var data = [rankList?.getFirst, rankList?.getFirst, rankList?.getThird, rankList?.getFourth, rankList?.getFifth, rankList?.getLast]
    var sum = data.reduce((a, b) => a + b)
    var data2 = data.map(x => {
        var result = ((x / sum) * 100)
        if(Math.round(result)===0) return result.toFixed(5)
        else return result.toFixed(2)
    })
    useEffect(() => {
        if(JSON.stringify(rankList)===JSON.stringify(list2)&&size===size2) return
        setList2(rankList)
        setSize2(size)
        if(chart) chart.destroy()
        var ctx = document.getElementById('myChart').getContext('2d');
        // Chart.plugins.register({ 모든 툴팁 고정
        //     beforeRender: function (chart) {
        //         if (chart.config.options.showAllTooltips) {
        //             // create an array of tooltips
        //             // we can't use the chart tooltip because there is only one tooltip per chart
        //             chart.pluginTooltips = [];
        //             chart.config.data.datasets.forEach(function (dataset, i) {
        //                 chart.getDatasetMeta(i).data.forEach(function (sector, j) {
        //                     chart.pluginTooltips.push(new Chart.Tooltip({
        //                         _chart: chart.chart,
        //                         _chartInstance: chart,
        //                         _data: chart.data,
        //                         _options: chart.options.tooltips,
        //                         _active: [sector]
        //                     }, chart));
        //                 });
        //             });

        //             // turn off normal tooltips
        //             chart.options.tooltips.enabled = false;
        //         }
        //     },
        //     afterDraw: function (chart, easing) {
        //         if (chart.config.options.showAllTooltips) {
        //             // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
        //             if (!chart.allTooltipsOnce) {
        //                 if (easing !== 1)
        //                     return;
        //                 chart.allTooltipsOnce = true;
        //             }

        //             // turn on tooltips
        //             chart.options.tooltips.enabled = true;
        //             Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
        //                 tooltip.initialize();
        //                 tooltip.update();
        //                 // we don't actually need this since we are not animating tooltips
        //                 tooltip.pivot();
        //                 tooltip.transition(easing).draw();
        //             });
        //             chart.options.tooltips.enabled = false;
        //         }
        //     }
        // });
        //차트 gradient 설정
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
        var chartjs = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Chart Graph',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: true,
                    backgroundColor: gradientFill,
                    data: data2,
                    pointBorderWidth: 10,
                    hoverBorderWidth: 13,
                    data2: data


                }]
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                easing: "easeInOutBack"
            },
            options: {
                maintainAspectRatio: false, //차트 상위 div에 구속
                legend: {
                    display: false, //범례 안보이게.
                },
                scales: {
                    yAxes: [{ //y축 설정
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true, //데이터 0부터 시작
                            stepSize : 20
                        },
                        

                    }],
                    xAxes: [{ //x축 설정
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
                        title: function () { //값을 리턴안해주기때문에 툴팁에 title이 안나온다. 안나오는 것이 깔끔해서 뺐음.
                            return;
                        },
                        label: function (tooltipItem, data) { //라벨 커스텀. 확률과 횟수.
                            return data['labels'][tooltipItem['index']] + " - " + data['datasets'][0]['data2'][tooltipItem['index']] + "번 , 확률 - " + data['datasets'][0]['data'][tooltipItem['index']] + "%";
                        },
                    }
                },
            }
        });
        setChart(chartjs)
    }, [rankList, size])



    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={size - 1170}>
                    {/* <Line
                    options={{
                        responsive: true,
                        legend: {
                            display: false,
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
                                    fontStyle: 'bold',
                                    fontColor: "black"
                                },
                                {
                                    render: 'percentage',
                                    fontSize : 14,
                                    fontStyle: 'bold',
                                    fontColor: "black"
                                }
                            ]
                        }
                    }}
                    redraw={resize}
                    data={expData}
                    height={95}
                    width={100}
                /> */}
                    <canvas height="300px" id="myChart"></canvas>
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default PieChart
