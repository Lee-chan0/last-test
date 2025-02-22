import styled from "styled-components";
import twitterIcon from '../../assets/simple-line-icons_social-twitter.png';
import shareIcon from '../../assets/material-symbols_home-outline-rounded.png';
import youtubeIcon from '../../assets/simple-line-icons_social-youtube.png';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Container = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 40px 80px;
  display : flex;

  @media (max-width : 767px) {
    display : none;
  }
`;

const ListsContainer = styled.div`
  width: 75%;
`;

const FooterCompanyDescriptionLists = styled.ul`
  display : flex;
  gap : 16px;
  margin-bottom : 32px;
`;

const FooterCompanyDescription = styled.li`
  font-weight: bold;

  a {
    color : ${({ theme }) => theme.gray.gray600};

    @media (min-width: 768px) and (max-width: 1279px) {
      font-size : 14px;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

const FooterCompanyContents = styled.ul`
  display : flex;
  flex-direction: column;
  gap : 20px;
`;

const FooterCompanyContentItem = styled.li`
  font-size : 14px;
  color : ${({ theme }) => theme.gray.gray400};

  @media (min-width: 768px) and (max-width : 1279px) {
    font-size: 12px;
  }
`;

const FooterIconsContainer = styled.div`
  width: 25%;
  display : flex;
  justify-content: center;
  align-items: center;
  gap : 32px;
  
  img {
    width: 24px;
    height: 24px;

    @media (min-width: 768px) and (max-width : 1279px) {
      width : 20px;
      height : 20px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const MobileFooter = styled.footer`
  width: 100%;
  height: 24px;
  background-color: ${({ theme }) => theme.blue.blue100};
  display : flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  span {
    font-size : 10px;
    color : ${({ theme }) => theme.gray.gray400};
  }
`;

function Footer() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <Container>
        <ListsContainer>
          <FooterCompanyDescriptionLists>
            <FooterCompanyDescription>
              <Link to={'/truescope-company-introduce'} style={{ textDecoration: 'none' }}>회사소개</Link>
            </FooterCompanyDescription>
            <FooterCompanyDescription>
              <Link to={'/truescope-company-introduce'} style={{ textDecoration: 'none' }}>사용자 이용약관</Link>
            </FooterCompanyDescription>
            <FooterCompanyDescription>
              <Link to={'/truescope-company-introduce'} style={{ textDecoration: 'none' }}>자주 묻는 질문</Link>
            </FooterCompanyDescription>
            <FooterCompanyDescription><a href="/" style={{ textDecoration: 'none' }}>문의하기</a></FooterCompanyDescription>
          </FooterCompanyDescriptionLists>
          <FooterCompanyContents>
            <FooterCompanyContentItem>주소 | 서울특별시 중구 청계천로 10 오페라타워 10층</FooterCompanyContentItem>
            <FooterCompanyContentItem>&#40;주&#41; 회사 | 대표 이찬영 | 개인정보보호 책임자 이찬영 | 이메일 yab0403@naver.com</FooterCompanyContentItem>
            <FooterCompanyContentItem>사업자 번호 | 123-456-789 | 통신 판매 업체 2025-서울 강서구-0000호</FooterCompanyContentItem>
            <FooterCompanyContentItem>copyrightⒸ LeeChanYoung inc. All rights reserved</FooterCompanyContentItem>
          </FooterCompanyContents>
        </ListsContainer>
        <FooterIconsContainer>
          <a href="/"><img src={shareIcon} alt="shareIcon" /></a>
          <a href="https://x.com/?lang=ko" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="twitterIcon" /></a>
          <a href="https://www.youtube.com/@MrsGREENAPPLE_Official" target="_blank" rel="noopener noreferrer"><img src={youtubeIcon} alt="youtubeIcon" /></a>
        </FooterIconsContainer>
      </Container>
      {isMobile &&
        <MobileFooter>
          <span>copyrightⒸ LeeChanYoung inc. All rights reserved</span>
        </MobileFooter>
      }
    </>
  )
}

export default Footer;