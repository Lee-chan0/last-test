import styled from "styled-components";
import cherryBack from '../../../assets/mi-min-pkpqoBp11Jc-unsplash.jpg';
import { useState } from "react";
import React from "react";
import { useMediaQuery } from "react-responsive";

const termsOfUseArray = [
  {
    title: '1. 본 사이트 이용 시 이용 약관에 동의해야 합니다.',
    description: '이 서비스를 이용하는 순간, 이용 약관 및 정책에 동의한 것으로 간주됩니다. 만약 본 약관에 동의하지 않는다면, 서비스 이용을 삼가 주시기 바랍니다. 원활한 이용을 위해 약관을 확인해 주세요.'
  },
  {
    title: '2. 계정 보안은 이용자의 책임입니다.',
    description: '비밀번호를 분실한 경우, 저희가 이를 대신 찾아드릴 수 없습니다. 계정 보안 관리는 이용자의 책임이며, 부주의로 인한 계정 도용 및 피해에 대해서는 책임지지 않습니다. 안전한 비밀번호 설정 및 관리를 권장합니다.'
  },
  {
    title: '3. 서비스 이용 시 부적절한 행위는 제한될 수 있습니다.',
    description: '본 서비스를 이용하는 동안 불법 행위, 스팸 활동, 해킹 시도 등의 부적절한 행위가 확인될 경우, 서비스 이용이 제한될 수 있습니다. 경우에 따라 관련 법적 조치가 이루어질 수도 있으므로, 올바른 이용을 부탁드립니다.'
  },
  {
    title: '4. 이용자가 제공한 콘텐츠는 서비스 운영에 활용될 수 있습니다.',
    description: '서비스에 업로드한 콘텐츠의 소유권은 이용자에게 있으나, 서비스 운영 및 홍보 목적으로 활용될 수 있습니다. 이에 동의하지 않는 경우, 콘텐츠 업로드를 자제해 주시기 바랍니다.'
  },
  {
    title: '5. 서비스 제공이 일시적으로 중단될 수 있습니다.',
    description: '서비스 점검, 시스템 오류, 기타 운영상의 이유로 인해 서비스가 일시적으로 중단될 수 있습니다. 이와 관련하여 별도의 보상이 제공되지 않는 점 양해 부탁드립니다. 원활한 서비스 제공을 위해 최선을 다하겠습니다.'
  }
];


const MainContainer = styled.div`
  height: 100vh;

  background-image: url(${cherryBack});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentMainContainer = styled.div`
  width: 150px;
  height: 150px;
  background-color: #F5A0D9;
  border-radius: 9999px;


  display : flex;
  justify-content: center;
  align-items: center;
  

  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5)inset;
`;

const ContentMainStyle = styled.div`
  width: 90%;
  height: 90%;
  background-color: #BA1689;
  border-radius: 9999px;
  font-weight: bold;
  color : #fff;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
  
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  
  position: relative;
  
  perspective: 800px;

  span {
    text-shadow: 0 0 3px rgba(0, 0, 0.1);
  }
  
  &:active {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5)inset;
  }

  & > .card-0 {
    transition: opacity 0.6s, transform 0.7s ease;
    left : -270%;
  }

  & > .card-1 {
    transition: opacity 1s, transform 0.7s ease;
    left : -170%;
    top : -130%;
  }

  & > .card-2 {
    transition: opacity 1.4s, transform 0.7s ease;
    right : -170%;
    top : -130%;
  }

  & > .card-3 {
    transition: opacity 1.7s, transform 0.7s ease;
    right : -270%;
  }

  & > .card-4 {
    transition: opacity 2s, transform 0.7s ease;
    bottom : -145%;
  }
`;

const ContentItemsCardContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  border : 5px solid #BA1689;
  padding : 0 16px;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;

  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.3);
  opacity: ${({ $isActive }) => $isActive ? `1` : `0`};
  pointer-events : ${({ $isActive }) => !$isActive && `none`};
  background-color: #FBECF6;
  color : #BA1689;

  border-radius: 8px;
  font-size : 14px;
  
  transform : rotateY(0);


  &:hover {
    transform: rotateY(180deg);
  }
`;

const ContentItemsFront = styled.div`
  position: absolute;
  width: 150px;
  top : 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  backface-visibility: hidden;
`;

const ContentItemsBack = styled.div`
  position: absolute;
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 1.3;
  font-size : 13px;
  color : #000;
  text-shadow: 0 0 1px rgba(0, 0, 0.1);

  transform: rotateY(180deg);
  backface-visibility: hidden;
`;

const TabletModeDescriptions = styled.ul`
  width: 80%;

  display : flex;
  flex-direction: column;
  gap : 16px;
`;

const TabletModeItems = styled.li`
  display : flex;
  flex-direction: column;
  gap : 8px;

  h1 {
    font-size : 20px;
    color : #BA1689;
  }

  p {
    font-size : 14px;
    color : #880813;
    opacity: 0.7;

    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

function TermsofUsePage() {
  const [isActiveMainContainer, setIsActiveMainContainer] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const mouseClickMain = () => {
    setIsActiveMainContainer((prev) => !prev);
  }

  return (
    (!isTablet) ?
      (
        <MainContainer>
          <ContentContainer>
            <ContentMainContainer>
              <ContentMainStyle onClick={mouseClickMain}>
                <span>사용자 이용 약관</span>
                {
                  termsOfUseArray.map((item, index) => {
                    const { title, description } = item;
                    return (
                      <ContentItemsCardContainer key={index} $isActive={isActiveMainContainer} className={`card-${index}`}>
                        <ContentItemsFront>{title}</ContentItemsFront>
                        <ContentItemsBack>{description}</ContentItemsBack>
                      </ContentItemsCardContainer>
                    )
                  })
                }
              </ContentMainStyle>
            </ContentMainContainer>
          </ContentContainer>
        </MainContainer>
      )
      :
      (
        <MainContainer>
          <ContentContainer>
            <TabletModeDescriptions>
              <h3 style={{
                textAlign: 'center',
                marginBottom: '16px',
                fontSize: '1.5rem',
                color: '#9D006E',
                backgroundColor: '#FBCCEB',
                padding: '8px 0',
                borderRadius: '4px'
              }}>사용자 이용 약관</h3>
              {
                termsOfUseArray.map((item, index) => {
                  const { title, description } = item;
                  return (
                    <TabletModeItems key={index}>
                      <h1>{title}</h1>
                      <p>{description}</p>
                    </TabletModeItems>
                  )
                })
              }
            </TabletModeDescriptions>
          </ContentContainer>
        </MainContainer >
      )
  )
}

export default TermsofUsePage;