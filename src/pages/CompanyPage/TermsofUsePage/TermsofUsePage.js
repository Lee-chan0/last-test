import styled from "styled-components";
import cherryBack from '../../../assets/mi-min-pkpqoBp11Jc-unsplash.jpg';

const termsOfUseArray = [
  {
    title: '1. 이 사이트를 쓰려면 동의하세요.아니면 나가세요.',
    description: '이 서비스(이하 "사이트")를 이용하는 순간, 우리 규칙에 동의한 겁니다. 약관이 마음에 안 들면 ? 뒤로 가기 누르세요.강요 안 합니다.하지만 계속 쓰겠다면, 이 약관 꼼꼼히 읽고 불평하지 마세요.'
  },
  {
    title: '2. 계정은 니 책임.해킹당해도 우린 모름.',
    description: '비밀번호 잊어버리면 ? 우리가 대신 기억 안 해줍니다.계정 관리 똑바로 하세요.누가 여러분 계정으로 사고 쳐도 우리 책임 아님.보안 철저히 안 하고 나중에 억울해하지 마세요.'
  },
  {
    title: '3. 허튼 짓 하면 바로 차단.변명도 듣기 싫음',
    description: '이 사이트로 해킹, 불법 복제, 스팸 같은 짓거리 ? 바로 계정 정지합니다.변명하지 마세요.법적 조치 들어갈 수도 있으니까 알아서 조심하세요.'
  },
  {
    title: '4. 콘텐츠 올리면 우리 맘대로 씁니다.불만 있으면 올리지 마세요.',
    description: '여기에 올린 콘텐츠 ? 여전히 니 꺼긴 한데, 우리도 마음껏 씁니다.서비스 홍보에 쓰든, 다른 곳에 공유하든, 우리가 알아서 할 거예요.싫으면 안 올리면 됩니다.'
  },
  {
    title: '5. 서비스 끊겨도 우린 몰라요.불평 금지.',
    description: '서버 점검 ? 버그 ? 시스템 터짐 ? 우리도 사람이에요.서비스 멈춰도 환불 ? 그런 거 없습니다.그냥 기다리세요.이게 싫으면 다른 사이트 가셔도 됩니다.'
  }
]

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

const Test = styled.div`
  width: 250px;
  height: 250px;
  background-color: blue;
  position: absolute;
`;

function TermsofUsePage() {

  return (
    <MainContainer>
      <ContentContainer>
        <Test />
      </ContentContainer>
    </MainContainer>
  )
}

export default TermsofUsePage;