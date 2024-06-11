import styled from "styled-components";
import Header from "./Header";

const StyleDiv = styled.div`
    max-width: 1280px;
    margin: 100px auto;
`

function Layout({ children }) {
    return (
        <>
            <Header />
            <StyleDiv>{children}</StyleDiv>
        </>
    );
}

export default Layout;