import { useRef, useEffect } from 'react'
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


const PieChart = () => {

    const {graphSize,chartMainData} = useSelector((state) => state.ChartReducer);
    const chart = useRef()





    useEffect(() => {
        // if (JSON.stringify(rankList) === JSON.stringify(list2.current) && size === size2.current) return
        if(chartMainData.length===0)return

        var labels = chartMainData.map(i => i[0])
        var data = chartMainData.map(i => i[1])
        var sum = data.reduce((a, b) => a + b)
        var data2 = data.map(x => {
            var result = ((x / sum) * 100)
            if (Math.round(result) === 0) return result.toFixed(5)
            else return result.toFixed(2)
        })

        if (chart.current) chart.current.destroy()

        var ctx = document.getElementById('myChart').getContext('2d');
        // Chart.plugins.register({
        //     beforeRender: function (chart) {
        //         if (chart.config.options.showAllTooltips) {
        //             // create an array of tooltips
        //             // we can't use the chart tooltip because there is only one tooltip per chart
        //             chart.pluginTooltips = [];
        //             console.log(chart.data)
        //             chart.config.data.datasets.forEach(function (dataset, i) {
        //                 chart.getDatasetMeta(i).data.forEach(function (sector, j) {
        //                     if(j!=0) return
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
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.5)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.5)");

        var gradientFillPoint = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFillPoint.addColorStop(0, "rgba(128, 182, 244, 0.4)");
        gradientFillPoint.addColorStop(1, "rgba(244, 144, 128, 0.4)");
        
        var chartjs = new Chart(ctx, {
            plugins : [{
                afterDatasetDraw : function(chart, easing) {
                    // To only draw at the end of animation, check for easing === 1
                    var ctx = chart.ctx;
                    chart.data.datasets.forEach(function (dataset, i) {
                        var meta = chart.getDatasetMeta(i);
                        if (!meta.hidden) {
                            meta.data.forEach(function(element, index) {
                                // Draw the text in black, with the specified font
                                ctx.fillStyle = 'rgb(0, 0, 0)';
                                var fontSize = 10;
                                var fontStyle = 'normal';
                                var fontFamily = 'Helvetica Neue';
                                ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                                // Just naively convert to string for now
                                var dataString = dataset.data[index].toString()+"%";
                                // Make sure alignment settings are correct
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                var padding = 5;
                                var position = element.tooltipPosition();
                                ctx.fillText(dataString, position.x-20, (position.y - (fontSize / 2) - padding)+20);
                            });
                        }
                    });
                }
            }],
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Chart Graph',
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor : gradientFillPoint,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 15,
                    pointRadius: 3,
                    pointHitRadius: 10, //hover 범위
                    fill: true,
                    backgroundColor: gradientFill,
                    data: data2,
                    pointBorderWidth: 3,
                    hoverBorderWidth: 13,
                    data2: data


                }]
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
                            stepSize: 20,
                            callback: function(value) { //y축 라벨 커스텀
                                return  value + "%";
                            }
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
                            return data['labels'][tooltipItem['index']] + " - " + data['datasets'][0]['data2'][tooltipItem['index']].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "번 , 확률 - " + data['datasets'][0]['data'][tooltipItem['index']] + "%";
                        },
                    }
                },
            }
        });
        // document.getElementById("myChart").onclick = function(event) { 
        //     var activePoint = chartjs.getElementAtEvent(event);
        //     console.log(activePoint)
        //     // make sure click was on an actual point
        //     if (activePoint.length > 0) {
        //       var clickedDatasetIndex = activePoint[0]._datasetIndex;
        //       var clickedElementindex = activePoint[0]._index;
        //       var label = chartjs.data.labels[clickedElementindex];
        //       var value = chartjs.data.datasets[clickedDatasetIndex].data[clickedElementindex];   
        //     //   activePoint[0]._options.hoverRadius = 20
        //     //   alert("Clicked: " + label + " - " + value);
        //     }
        //   };
        chart.current = chartjs
    }, [chartMainData, graphSize])



    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={graphSize - 1170}>
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
