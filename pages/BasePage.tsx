import Head from "next/head";
import styled from "styled-components";
import { BodyColor } from "../components/BodyColor";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageContent = styled.div`
  margin-top: 20px;
  width: 90%;
`;

const StyledMain = styled.main`
  padding: 60px 180px;
`;

interface BasePageProps {
  children: (React.ReactElement | string)[] | React.ReactElement | string;
  title: string;
}

export const BasePage: React.FC<BasePageProps> = ({ children, title }) => {
  return (
    <StyledWrapper>
      <StyledPageContent>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider>
          <BodyColor />
          <Header />
          <StyledMain>{children}</StyledMain>
          <Footer />
        </ThemeProvider>
      </StyledPageContent>
    </StyledWrapper>
  );
};
