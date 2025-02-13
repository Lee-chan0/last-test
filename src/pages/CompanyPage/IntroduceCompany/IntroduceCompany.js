import { useRef, useState } from 'react';
import cherryBack from '../../../assets/mi-min-pkpqoBp11Jc-unsplash.jpg';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100vh;
  background-image: url(${cherryBack});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display : flex;
  justify-content: center;
  align-items: center;

  perspective: 800px;
`;

const Card = styled.div`
  width: 600px;
  height: auto;
  transform-style : preserve-3d;
  background-color: pink;

  box-shadow : 0 0 15px 5px rgba(0, 0, 0, 0.5);

  border-radius: 8px;
  position: relative;
`;

const CardLight = styled.div`
  position: absolute;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center, 
    rgba(255, 199, 112, 0.8) 20%,
    rgba(132, 50, 255, 0.6) 40%,
    transparent 70%
  );
  background-size: 150%;
  background-position: center;

  filter: brightness(1.2) opacity(0.7);
  mix-blend-mode: color-dodge;
`;

const CardDescriptionContainer = styled.div`
  padding : 8px;
  background-color: ${({ theme }) => theme.gray.gray100};
  border-radius: 8px;
  margin : 24px;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.5) inset;
`;

const CardTitle = styled.h1`
  width: 100%;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color : #BA1689;
  margin-top : 8px;
`;

const CardDescription = styled.p`
  line-height: 2;
  font-size : 14px;
  font-weight: 400;
  text-shadow: 0 0px 1px rgba(0, 0, 0, 0.5);
`;

const CardReadMode = styled.button`
  position: absolute;
  top : 10%;
  padding : 8px 16px;
  background-color: #F5A0D9;
  border-radius: 4px;
  font-weight: 600;
  color : #fff;
  transition : background-color 0.3s;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #E23FB2;
  }
`;

function IntroduceCompany() {
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const cardRef = useRef(null);
  const cardLightRef = useRef(null);

  const mouseMove = (e) => {
    if (isActiveBtn) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    const centerX = cardWidth / 2 + rect.left;
    const centerY = cardHeight / 2 + rect.top;

    const cursorX = e.clientX - centerX;
    const cursorY = e.clientY - centerY;

    const rotateX = (-cursorY / (cardHeight / 2)) * 15;
    const rotateY = (cursorX / (cardWidth / 2)) * 15;

    card.style.transition = `transform 0s`;
    requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${-cursorX / 10}px ${-cursorY / 10}px 15px 5px rgba(0, 0, 0, 0.5)`;
    })
  }

  const mouseLightMove = (e) => {
    if (isActiveBtn) return;
    const light = cardLightRef.current;
    const lightRect = light.getBoundingClientRect();

    // 화면안에서의 커서 위치
    const cursorX = e.clientX - lightRect.left;
    const cursorY = e.clientY - lightRect.top;

    const positionX = (cursorX / lightRect.width) * 100;
    const positionY = (cursorY / lightRect.height) * 100;

    requestAnimationFrame(() => {
      light.style.background = `
        radial-gradient(
        circle at ${positionX}% ${positionY}%,
        rgba(255, 199, 112, 0.8) 20%,
        rgba(132, 50, 255, 0.6) 40%,
        transparent 65%
      )`;
    });
  }

  const clickActiveBtn = () => {
    setIsActiveBtn((prev) => !prev);
    const card = cardRef.current;
    const light = cardLightRef.current;

    card.style.transition = `transform 1s, box-shadow 1s`;
    light.style.transition = `background 1s`;
    light.style.background = `
      radial-gradient(
      circle at center, 
      transparent 0%,
      transparent 100%)
    `;

    requestAnimationFrame(() => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.boxShadow = `0px 0px 15px 5px rgba(0, 0, 0, 0.5)`;
    })
  }

  return (
    <MainContainer>
      <CardContainer>
        <Card
          ref={cardRef}
          onMouseMove={mouseMove}
          $isActiveBtn={isActiveBtn}
        >
          <CardLight ref={cardLightRef} onMouseMove={mouseLightMove} />
          <CardDescriptionContainer>
            <CardTitle>Company Introduce</CardTitle>
            <CardDescription>
              <br />
              저희 <strong style={{ color: '#BA1689' }}>TrueScope</strong>는
              독립적이고 신뢰할 수 있는 뉴스를 제공하는 것을 사명으로 합니다.
              정치, 사회, 국제 분야에서 균형 잡힌 시각과 깊이 있는 분석을 통해 독자 여러분께 사실에 기반한 정보를 전달합니다.<br />

              <strong style={{ color: '#BA1689' }}>TrueScope</strong>는 철저한 사실 검증과 공정한 보도를 원칙으로 삼아,
              독자들이 스스로 판단할 수 있는 힘을 기를 수 있도록 돕습니다.
              빠르게 변하는 세상 속에서 중요한 이슈를 놓치지 않고, 복잡한 사건의 이면을 심층적으로 다룹니다.

              저희는 단순한 뉴스 전달을 넘어, 사회적 책임을 다하고 민주주의 가치를 지키는 언론의 역할을 충실히 수행하고자 합니다.
              앞으로도 독자 여러분의 신뢰를 바탕으로 정확하고 깊이 있는 뉴스를 제공하는
              <strong style={{ color: '#BA1689' }}>TrueScope</strong>가 되겠습니다.
            </CardDescription>
          </CardDescriptionContainer>
        </Card>
        <CardReadMode onClick={clickActiveBtn}>{!isActiveBtn ? '읽기 모드' : '카드 모드'}</CardReadMode>
      </CardContainer>
    </MainContainer>
  )
}

export default IntroduceCompany;