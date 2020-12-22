import styled from 'styled-components'

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
        padding : 5px 10px;
        margin-bottom : 5px;
        margin-right : 5px;
        background : ${props => props.bg || "#EAEAEA"};
        color : ${props => props.color || "black"};
        border-radius : 10px;
        font-weight : 600;
        &:hover{
            background : black;
            color : white;
        }
    `
const Button = ({color,bg,content,click,id}:btnStyle) => {
    return (
        <Btn color={color} bg={bg} onClick={click} id={id}> 
            {content}
        </Btn>
    )
}

export default Button
