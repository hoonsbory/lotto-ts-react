import React from 'react'

type props ={
    upDown:boolean
    fill:string
}

const Arrow = ({upDown,fill}:props) => {
    return (
        <svg width="1.1em" style={{transform : `rotate(${upDown ? 90 : -90}deg)`, fill : fill}} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" x="0px" y="0px"><path d="M50.50851,27.936H23.39865l8.95849-8.72266a3.99994,3.99994,0,0,0-5.58008-5.73242L10.70089,29.13421a3.99979,3.99979,0,0,0,0,5.73242L26.77706,50.519a3.99994,3.99994,0,1,0,5.58008-5.73242L23.26657,35.936H50.50851a4,4,0,1,0,0-8Z"/></svg>
    )
}

export default Arrow
