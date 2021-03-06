import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import Chart2 from 'chart.js'
//막대 차트.


const ChartWrapper = styled.div`
    width : ${props => props.size}px
`
const ScrollDiv = styled.div`
    overflow-x : auto;
`

const Chart = () => {
    const {chartMainData,graphSize,sortBtn} = useSelector((state) => state.ChartReducer);
    const chart = useRef()

    
    useEffect(() => {
        //여러 차트를 한 컴포넌트에서 관리했어야되는데 여기저기에 컴포넌트로 쓰여서 차트를 바꿀때마다 차트를 생성하기때문에, 두 번 렌더링된다.
        //이를 막기 위해 복사본을 ref로 관리해서 비교 후에 return을 해주었다.  chartjs를 처음써봐서 설계를 잘못했다 ㅜ
        //resize하기 위해 이전 차트 지움
        if(chart.current) chart.current.destroy()
        

        var ctx = document.getElementById('myChart').getContext('2d');
        
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
        var chartjs = new Chart2(ctx, {
            type: 'bar',
            data: {
                labels: chartMainData.map(x => `${x[0]}번`),
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
                    data: chartMainData.map(x => x[1]),
                    pointBorderWidth: 10,
                    hoverBorderWidth: 13,


                }]
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
                            //y축 데이터 최대치 설정. sort 상태에 따라서 최대치 설정. 막대 그래프 위에 데이터수치가 보이기때문에 최대치를 늘려줘야 데이터가 안가려짐
                            suggestedMax: chartMainData.length >0 ? (sortBtn ? chartMainData[chartMainData.length-1][1] + chartMainData[chartMainData.length-1][1]*0.1 : chartMainData[0][1] + chartMainData[0][1]*0.1) : 0,
                            callback: function(value) { //y축 라벨 커스텀
                                if(Math.floor(value) === value) //소수점 제거
                                return  value  + "회";
                            }
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

        chart.current = chartjs
    }, [chartMainData,graphSize])


    return (
        <div>

            <ScrollDiv>
                <ChartWrapper size={graphSize}>
                    <canvas  height="300px" id="myChart"></canvas>
                </ChartWrapper>
            </ScrollDiv>
        </div>
    )
}

export default Chart

