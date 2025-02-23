import styled from 'styled-components';
import Footer from '../../../components/Footer/Footer';
import LogoContainer from '../../../components/LogoCotainer/LogoContainer';
import IntroduceCompany from '../IntroduceCompany/IntroduceCompany';
import TermsofUsePage from '../TermsofUsePage/TermsofUsePage';
import QuestionPage from '../QuestionPage/QuestionPage';

const IntroduceMainContainer = styled.div`
  height: 300vh;
  overflow: hidden;
`;

const MainContainer = styled.div`
  overflow-x: hidden;
`;

function IntroducePage() {
  return (
    <MainContainer>
      <LogoContainer isIntroducePage={true} />
      <IntroduceMainContainer>
        <IntroduceCompany />
        <QuestionPage />
        <TermsofUsePage />
      </IntroduceMainContainer>
      <Footer />
    </MainContainer>
  )
}

export default IntroducePage;
