import styled from "styled-components";
import twitterIcon from '../../assets/simple-line-icons_social-twitter.png';
import shareIcon from '../../assets/famicons_share-social-outline.png';
import youtubeIcon from '../../assets/simple-line-icons_social-youtube.png';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.blue.blue100};
  padding : 40px 80px;
  display : flex;
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
  color : ${({ theme }) => theme.gray.gray600};

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

    &:hover {
      cursor: pointer;
    }
  }
`;

function Footer() {
  return (
    <Container>
      <ListsContainer>
        <FooterCompanyDescriptionLists>
          <FooterCompanyDescription>회사소개</FooterCompanyDescription>
          <FooterCompanyDescription>사용자 이용약관</FooterCompanyDescription>
          <FooterCompanyDescription>개인정보 처리방침</FooterCompanyDescription>
          <FooterCompanyDescription>자주 묻는 질문</FooterCompanyDescription>
          <FooterCompanyDescription>문의하기</FooterCompanyDescription>
        </FooterCompanyDescriptionLists>
        <FooterCompanyContents>
          <FooterCompanyContentItem>주소 | 서울특별시 중구 청계천로 10 오페라타워 10층</FooterCompanyContentItem>
          <FooterCompanyContentItem>&#40;주&#41; 회사 | 대표 이찬영 | 개인정보보호 책임자 이찬영 | 이메일 yab0403@naver.com</FooterCompanyContentItem>
          <FooterCompanyContentItem>사업자 번호 | 123-456-789 | 통신 판매 업체 2025-서울 강서구-0000호</FooterCompanyContentItem>
          <FooterCompanyContentItem>copyrightⒸ LeeChanYoung inc. All rights reserved</FooterCompanyContentItem>
        </FooterCompanyContents>
      </ListsContainer>
      <FooterIconsContainer>
        <a href="#"><img src={shareIcon} alt="shareIcon" /></a>
        <a href="#"><img src={twitterIcon} alt="twitterIcon" /></a>
        <a href="#"><img src={youtubeIcon} alt="youtubeIcon" /></a>
      </FooterIconsContainer>
    </Container>
  )
}

export default Footer;