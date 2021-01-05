import React from 'react'
import styled from 'styled-components'

const Head = styled.h3`
    background : rgb(86,115,235);
    color : white;
    border-radius : 15px;
    padding : 5px 10px;
    transition:all ease-out .3s;
    white-space: nowrap;
`

type props = {
    content : any
}

const SubTitle = ({content}:props) => {
    return (
        <Head>{content}</Head>
    )
}

export default SubTitle
