
const articles = [
  {
    articleId: 1,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "기후 변화로 인한 한파, 전 세계에 경고",
    articleContent: "전문가들은 이번 겨울 기록적인 한파가 기후 변화와 밀접한 연관이 있다고 경고하고 있습니다. 북극의 기온 상승과 제트기류의 변화가 한파를 초래하며, 이는 에너지 수요 증가와 같은 경제적 영향을 미칠 것으로 보입니다. 이에 따라 정부와 기업은 지속 가능한 에너지 정책을 수립할 필요가 강조되고 있습니다."
  },
  {
    articleId: 2,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "전기차 시장 급성장, 내연기관의 종말 예고",
    articleContent: "글로벌 전기차 시장이 폭발적으로 성장하고 있습니다. 주요 자동차 제조사들은 전기차 라인업을 확장하며 내연기관 차량의 생산 중단 계획을 속속 발표하고 있습니다. 이와 함께 배터리 기술 개발과 충전 인프라 확충이 전기차 시대를 더욱 가속화하고 있습니다."
  },
  {
    articleId: 3,
    articleImgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjJfMTA4/MDAxNzExMTEwMjYyOTAz.g7ZmBrlfHg5kcOeGiPllsi6ThyrbO2g9EpCOkNXogX0g.51P7cq29P-vZ8HIpr-UbhpF3lPZ9Y9fef6z-aoELGc8g.JPEG/ssaengcho-24%EB%85%84_4%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-PC.jpg?type=w800",
    articleTitle: "AI 기술, 의료 혁신의 새로운 가능성 열어",
    articleContent: "인공지능(AI)이 의료 분야에서 혁신을 일으키고 있습니다. AI를 활용한 진단 시스템은 질병 조기 발견에 중요한 역할을 하고 있으며, 환자 맞춤형 치료 제공이 가능해지고 있습니다. 하지만 데이터 보안과 윤리적 문제 해결은 여전히 중요한 과제로 남아 있습니다."
  },
  {
    articleId: 4,
    articleImgUrl: "https://plus.unsplash.com/premium_photo-1661886882389-e99d9a5299c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjAlRUIlOEYlODQlRUMlOEIlOUMlMjAlRUIlQjAlQjAlRUElQjIlQkQlMjAlRUQlOTklOTQlRUIlQTklQjR8ZW58MHx8MHx8fDA%3D",
    articleTitle: "집값 안정화 정책, 시장에 어떤 영향을 미칠까?",
    articleContent: "정부의 새로운 집값 안정화 정책이 발표되었습니다. 전문가들은 이 정책이 실수요자 중심의 시장 안정화에 기여할 것으로 기대하고 있으나, 일부에서는 공급 부족 문제가 여전히 심각하다고 지적하고 있습니다. 앞으로의 시장 변화가 주목됩니다."
  },
  {
    articleId: 5,
    articleImgUrl: "https://img.pikbest.com/backgrounds/20220119/colorful-technology-city-hd-background_6234968.jpg!w700wp",
    articleTitle: "소셜미디어 플랫폼, 새로운 규제안 도입",
    articleContent: "정부는 소셜미디어 플랫폼의 부작용을 줄이기 위한 새로운 규제안을 발표했습니다. 가짜뉴스 확산 방지와 개인정보 보호 강화가 주요 목표이며, 플랫폼 운영사들은 규제 준수를 위해 내부 정책을 수정하고 있습니다. 이에 대한 사용자들의 반응도 엇갈리고 있습니다."
  },
  {
    articleId: 6,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "한국 영화, 국제 영화제에서 연이은 수상",
    articleContent: "한국 영화가 국제 영화제에서 연달아 수상하며 주목받고 있습니다. 다양한 장르와 독창적인 스토리텔링이 관객과 심사위원의 마음을 사로잡았다는 평가입니다. 영화 관계자들은 글로벌 시장에서 한국 영화의 가능성을 낙관적으로 보고 있습니다."
  },
  {
    articleId: 7,
    articleImgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjJfMTA4/MDAxNzExMTEwMjYyOTAz.g7ZmBrlfHg5kcOeGiPllsi6ThyrbO2g9EpCOkNXogX0g.51P7cq29P-vZ8HIpr-UbhpF3lPZ9Y9fef6z-aoELGc8g.JPEG/ssaengcho-24%EB%85%84_4%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-PC.jpg?type=w800",
    articleTitle: "탄소중립 목표, 기업들의 역할이 중요해진다",
    articleContent: "2050년 탄소중립 달성을 위한 기업들의 노력이 더욱 요구되고 있습니다. 신재생 에너지 투자와 친환경 제품 개발이 주요 과제로 떠오르는 가운데, 많은 기업들이 ESG 경영을 강화하고 있습니다. 하지만 비용 문제로 어려움을 겪는 기업도 많아 정부 지원이 필요한 상황입니다."
  },
  {
    articleId: 8,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "디지털 전환, 중소기업에도 필수 과제로 부상",
    articleContent: "디지털 전환이 대기업뿐만 아니라 중소기업에도 필수적인 과제로 떠오르고 있습니다. 전자상거래와 클라우드 기술 도입이 중소기업의 경쟁력을 강화시키는 핵심 요소로 평가받고 있습니다. 하지만 기술 격차를 해소하기 위한 교육과 지원책이 필요하다는 목소리도 나오고 있습니다."
  },
  {
    articleId: 9,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "우주 탐사 시대, 민간 기업의 도약",
    articleContent: "민간 우주 기업들이 우주 탐사 시대를 선도하고 있습니다. 화성 탐사와 달 기지 건설 계획이 속속 발표되며, 새로운 기술과 자본이 이 분야로 집중되고 있습니다. 우주 관광 산업도 점차 현실화되고 있어 많은 이들의 기대를 모으고 있습니다."
  },
  {
    articleId: 10,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "한국 전통문화, 세계 유산으로 인정받다",
    articleContent: "한국의 전통문화가 유네스코 세계유산으로 등재되며 국제적 가치를 인정받고 있습니다. 전문가들은 문화유산 보존과 전승을 위한 지속적인 노력이 필요하다고 강조하며, 이를 통해 한국 문화의 위상을 더욱 높일 수 있을 것으로 기대하고 있습니다."
  }
];

const brandLogos = [
  {
    brandLogoId: 1,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/fc26f66b-2245-4148-86f5-2640f9945359/image.png"
  },
  {
    brandLogoId: 2,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/9b071890-232e-46c2-88b4-a42370159b6e/image.png"
  },
  {
    brandLogoId: 3,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/2fe41fe3-2929-4f5f-ac0c-a7d5cde2ec4b/image.png"
  },
  {
    brandLogoId: 4,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/cd65614c-8854-4fa6-b7a0-5cb1674d6e0f/image.png"
  },
  {
    brandLogoId: 5,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/243e7622-55de-4c15-bb77-2ed984af2f8c/image.png"
  },
  {
    brandLogoId: 6,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/7f88b1e3-e0d5-4fe8-80fc-2eda0c6a2ad7/image.png"
  },
  {
    brandLogoId: 7,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/8de676a8-48b6-4e20-a937-8f622d128493/image.png"
  },
  {
    brandLogoId: 8,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/a0e4d590-b583-4fb5-a25f-7bff3eac8b80/image.png"
  },
  {
    brandLogoId: 9,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/c3bba96f-6bc7-4b2a-b5c7-511023c54ee1/image.png"
  },
  {
    brandLogoId: 10,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/820665c0-be57-424f-a35e-ed521037d384/image.png"
  },
  {
    brandLogoId: 11,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/cff0cd30-40c2-4337-bfa7-f48b6d5165f8/image.png"
  },
  {
    brandLogoId: 12,
    brandLogoImgUrl: "https://velog.velcdn.com/images/yab0403/post/50f2cd83-5b9d-48fa-8fce-693e5a5d1338/image.png"
  },
]

export { articles, brandLogos };