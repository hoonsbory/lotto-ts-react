import { useState, useEffect } from 'react'
import "chartjs-plugin-labels"
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import Chart, { Tooltip } from 'chart.js';
// type wrapperProps = {
//     size: number
// }
// type props = {
//     rankList?:RankResult
// }

const ScrollDiv = styled.div`
    overflow-x : auto;
`
const ChartWrapper = styled.div`
    width : ${props => props.size}px
`


const PieChart = ({ rankList }) => {

    var resize = useSelector((state) => state.Reducer.resizeOpt);
    var size = useSelector((state) => state.Reducer.graphSize);
    const [list2 ,setList2] = useState()
    const [size2 ,setSize2] = useState()

    const expData = {
        labels: ["1등", "2등", "3등", "4등", "5등", "꽝"],
        datasets: [
            {
                data: [rankList?.getFirst, rankList?.getFirst, rankList?.getThird, rankList?.getFourth, rankList?.getFifth, rankList?.getLast],
                borderWidth: 2,
                hoverBorderWidth: 3,
                backgroundColor:
                    ["#fbc400", "#69c8f2", "#ff7272", "#b0d840", "rgb(255,94,0)", "#aaa"]
                ,
            }
        ]
    };
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
        if(window.chartjs) window.chartjs.destroy()
        var ctx = document.getElementById('chartFixedTooltips').getContext('2d');
        // Chart.plugins.register({
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
                    pointBorderWidth: 10,
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
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            stepSize : 20
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
                            return data['labels'][tooltipItem['index']] + " - " + data['datasets'][0]['data2'][tooltipItem['index']] + "번 , 확률 - " + data['datasets'][0]['data'][tooltipItem['index']] + "%";
                        },
                    }
                },
            }
        });
    }, [rankList, resize])



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
                    <canvas height="300px" id="chartFixedTooltips"></canvas>
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default PieChart
