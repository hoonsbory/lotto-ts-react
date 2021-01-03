import styled from 'styled-components'
//양옆에 라인이 있는 div 커스터마이징 할 수 있게 props 설정해줌
interface styleProps {
    color? : string;
    fontSize? : number;
}
interface props {
    color? : string;
    fontSize? : number;
    content : any;
}


const Div = styled.div<styleProps>`
    margin-top : 10px;
    margin-bottom : 5px;
    color : ${props => props.color || 'unset'};
    font-size : ${props => props.fontSize+"px" || 'unset'};
    font-weight : 600;
    display: flex;
    align-items: center;
    &:before{
        content: "";
        margin-right : 8px;
        flex: 0%;
        height: 1px;
        background: rgba(134, 134, 134, 0.19);
        z-index: -100;
    }
    &:after{
        content: "";
        margin-left : 8px;
        flex: 0%;
        height: 1px;
        background: rgba(134, 134, 134, 0.19);
        z-index: -100;
    }
`

const LineDiv = ({color,content,fontSize}:props) => {
    return (
        <Div color={color} fontSize={fontSize}>
            {content}
        </Div>
    )
}
export default LineDiv

