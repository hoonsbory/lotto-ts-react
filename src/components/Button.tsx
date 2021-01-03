import styled from 'styled-components'
//기본 버튼.
interface btnProps {
    color?: string
    bg? : string
    hoverBg? : string
    float? : string
    border? : boolean
    fontSize? : string
}
interface btnStyle {
    color?: string;
    bg?: string;
    content: any;
    click?: any;
    id?: string;
    hoverBg? : string
    float? : string
    fontSize? : string
    border? : boolean
}
const Btn = styled.button<btnProps>`
        float : ${props => props.float};
        border : ${props => props.border ? "1px solid rgba(193,193,193,0.565)" : 0};
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.bg || "#EAEAEA"};
        color : ${props => props.color || "unset"};
        border-radius : 5px;
        font-weight : 600;
        font-size : ${props => props.fontSize || ".9em"} !important;
        ${props => sessionStorage.getItem("mobile")==="true" ? `&:active{background : ${props.hoverBg || "rgb(70, 77, 82)"}; color : white;}`: `&:hover{background : ${props.hoverBg || "rgb(86,115,235)"}; color : white;}`}
        ${props => props.theme.noneOutline}
    `
const Button = ({float,color,bg,content,click,id,hoverBg,border, fontSize}:btnStyle) => {
    return (
        <Btn fontSize={fontSize} border={border} float={float} hoverBg={hoverBg} color={color} bg={bg} onClick={click} id={id}> 
            {content}
        </Btn>
    )
}

export default Button
