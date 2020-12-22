import styled from 'styled-components'
//기본 버튼.
interface btnProps {
    color?: string
    bg? : string
}
type btnStyle = {
    color?: string;
    bg?: string;
    content: string;
    click?: any;
    id?: string;
}
const Btn = styled.button<btnProps>`
        border : 0;
        outline : 0;
        cursor : pointer;
        transition:all ease-out .5s;
        padding : 5px 10px;
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.bg || "#EAEAEA"};
        color : ${props => props.color || "unset"};
        border-radius : 10px;
        font-weight : 600;
        ${sessionStorage.getItem("mobile")==="true" ? '&:active{background : rgb(70, 77, 82); color : white;}': '&:hover{background : rgb(70, 77, 82); color : white;}'}
    `
const Button = ({color,bg,content,click,id}:btnStyle) => {
    return (
        <Btn color={color} bg={bg} onClick={click} id={id}> 
            {content}
        </Btn>
    )
}

export default Button
