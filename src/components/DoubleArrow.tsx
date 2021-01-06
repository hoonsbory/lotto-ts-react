import React from 'react'
//slide footer 화살표 버튼
type props ={
    upDown:boolean
    fill:string
}

const DoubleArrow = ({upDown,fill}:props) => {
    return (
        <svg width="15px" style={{transform : `rotate(${upDown ? 180 : 0}deg)`, fill : fill}} viewBox="0 -50 180.21003 320.50464999999997" version="1.1" x="0px" y="0px"><g transform="translate(194.21574,104.37169)"><path d="m -149.23767,-59.392579 -44.97807,44.979111 12.4348,12.4347954 12.43479,12.4347976 32.36812,-32.366688 c 17.80247,-17.801677 32.52623,-32.366685 32.71947,-32.366685 0.19325,0 14.976582,14.624585 32.851856,32.499079 L -38.9062,10.72091 -26.455957,-1.6984506 -14.005714,-14.117809 -59.131619,-59.244751 c -24.819252,-24.819813 -45.126371,-45.126939 -45.126941,-45.126939 -7.1e-4,0 -20.24117,20.240596 -44.97911,44.979111 z m 0,115.711105 -44.97807,44.979114 12.4348,12.43479 12.43479,12.4348 32.36812,-32.366694 c 17.80247,-17.80167 32.52623,-32.36668 32.71947,-32.36668 0.19325,0 14.976582,14.62458 32.851856,32.49908 L -38.9062,126.43202 -26.455957,114.01266 -14.005714,101.5933 -59.131619,56.466356 c -24.819252,-24.81982 -45.126371,-45.126942 -45.126941,-45.126942 -7.1e-4,0 -20.24117,20.240602 -44.97911,44.979112 z" strokeWidth="0.35277775"/></g></svg>
    )
}

export default DoubleArrow
