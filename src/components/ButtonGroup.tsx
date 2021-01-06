import styled, { css } from 'styled-components'

type props = {
    click: any
    content: string[]
    hover?: string
    bg?: string
    color?: string
    selected: boolean[]
    selectColor?: string
    selectBg?: string
}
type btnProps = {
    hover?: string
    bg?: string
    color?: string
    selected: boolean
    selectColor?: string
    selectBg?: string
}

const Group = styled.div`
margin-right : 10px;
    
`
const btnCss = css<btnProps>`
    margin-left: 0;
    margin-right: 0;
    white-space: nowrap;
    ${props => props.theme.noneOutline}
    border : 1px solid rgba(193,193,193,0.565);
    background : ${props => props.selected ? (props.selectBg || "rgb(224, 230, 251)") : (props.bg || "white")};
    color : ${props => props.selected ? (props.selectColor || "rgb(86, 115, 235)") : (props.color || "gray")};
    ${props => sessionStorage.getItem("mobile") === "true" ?
        `&:active{
        background : ${props.selectBg || "rgb(224, 230, 251)"};
         color : ${props.selectColor || "rgb(86, 115, 235);"}
        }`
        :
        `&:hover{
            background : ${props.selectBg || "rgb(224, 230, 251)"};
            color : ${props.selectColor || "rgb(86, 115, 235);"}
        }`
    }
`
const FirstBtn = styled.button`
    ${btnCss}
    border-top-left-radius : 4px;
    border-bottom-left-radius : 4px;
`
const LastBtn = styled.button`
${btnCss}
    border-top-right-radius : 4px;
    border-bottom-right-radius : 4px;
    border-left : none;
`
const Btn = styled.button`
    ${btnCss}
    border-left : none;
`


const ButtonGroup = ({ click, color, bg, hover, content, selected, selectColor, selectBg }: props) => {

    var map = content.map((x, idx) => {
        switch (idx) {
            case 0:
                return <FirstBtn selected={selected[idx]} color={color} bg={bg} hover={hover} selectBg={selectBg} selectColor={selectColor} onClick={() => click[idx](idx)}>{x}</FirstBtn>
            case content.length - 1:
                return <LastBtn selected={selected[idx]} color={color} bg={bg} hover={hover} selectBg={selectBg} selectColor={selectColor} onClick={() => click[idx](idx)}>{x}</LastBtn>

            default:
                return <Btn selected={selected[idx]} color={color} bg={bg} hover={hover} selectBg={selectBg} selectColor={selectColor} onClick={() => click[idx](idx)}>{x}</Btn>
        }
    })

    return (
        <Group>
            {map}
        </Group>
    )
}

export default ButtonGroup