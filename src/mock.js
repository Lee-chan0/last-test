
const articles = [
  {
    articleId: 0,
    articleImgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjJfMTA4/MDAxNzExMTEwMjYyOTAz.g7ZmBrlfHg5kcOeGiPllsi6ThyrbO2g9EpCOkNXogX0g.51P7cq29P-vZ8HIpr-UbhpF3lPZ9Y9fef6z-aoELGc8g.JPEG/ssaengcho-24%EB%85%84_4%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-PC.jpg?type=w800",
    articleTitle: "AI 기술, 의료 혁신의 새로운 가능성 열어",
    articleCategory: "사회뉴스",
    articleContent: "인공지능(AI)이 의료 분야에서 혁신을 일으키고 있습니다. AI를 활용한 진단 시스템은 질병 조기 발견에 중요한 역할을 하고 있으며, 환자 맞춤형 치료 제공이 가능해지고 있습니다. 하지만 데이터 보안과 윤리적 문제 해결은 여전히 중요한 과제로 남아 있습니다."
  },
  {
    articleId: 1,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "기후 변화로 인한 한파, 전 세계에 경고",
    articleCategory: "정치뉴스",
    articleContent: "전문가들은 이번 겨울 기록적인 한파가 기후 변화와 밀접한 연관이 있다고 경고하고 있습니다. 북극의 기온 상승과 제트기류의 변화가 한파를 초래하며, 이는 에너지 수요 증가와 같은 경제적 영향을 미칠 것으로 보입니다. 이에 따라 정부와 기업은 지속 가능한 에너지 정책을 수립할 필요가 강조되고 있습니다."
  },
  {
    articleId: 2,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "전기차 시장 급성장, 내연기관의 종말 예고",
    articleCategory: "정치뉴스",
    articleContent: "글로벌 전기차 시장이 폭발적으로 성장하고 있습니다. 주요 자동차 제조사들은 전기차 라인업을 확장하며 내연기관 차량의 생산 중단 계획을 속속 발표하고 있습니다. 이와 함께 배터리 기술 개발과 충전 인프라 확충이 전기차 시대를 더욱 가속화하고 있습니다."
  },
  {
    articleId: 3,
    articleImgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjJfMTA4/MDAxNzExMTEwMjYyOTAz.g7ZmBrlfHg5kcOeGiPllsi6ThyrbO2g9EpCOkNXogX0g.51P7cq29P-vZ8HIpr-UbhpF3lPZ9Y9fef6z-aoELGc8g.JPEG/ssaengcho-24%EB%85%84_4%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-PC.jpg?type=w800",
    articleTitle: "AI 기술, 의료 혁신의 새로운 가능성 열어",
    articleCategory: "국제뉴스",
    articleContent: "인공지능(AI)이 의료 분야에서 혁신을 일으키고 있습니다. AI를 활용한 진단 시스템은 질병 조기 발견에 중요한 역할을 하고 있으며, 환자 맞춤형 치료 제공이 가능해지고 있습니다. 하지만 데이터 보안과 윤리적 문제 해결은 여전히 중요한 과제로 남아 있습니다."
  },
  {
    articleId: 4,
    articleImgUrl: "https://plus.unsplash.com/premium_photo-1661886882389-e99d9a5299c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjAlRUIlOEYlODQlRUMlOEIlOUMlMjAlRUIlQjAlQjAlRUElQjIlQkQlMjAlRUQlOTklOTQlRUIlQTklQjR8ZW58MHx8MHx8fDA%3D",
    articleTitle: "집값 안정화 정책, 시장에 어떤 영향을 미칠까?",
    articleCategory: "정치뉴스",
    articleContent: "정부의 새로운 집값 안정화 정책이 발표되었습니다. 전문가들은 이 정책이 실수요자 중심의 시장 안정화에 기여할 것으로 기대하고 있으나, 일부에서는 공급 부족 문제가 여전히 심각하다고 지적하고 있습니다. 앞으로의 시장 변화가 주목됩니다."
  },
  {
    articleId: 5,
    articleImgUrl: "https://img.pikbest.com/backgrounds/20220119/colorful-technology-city-hd-background_6234968.jpg!w700wp",
    articleTitle: "소셜미디어 플랫폼, 새로운 규제안 도입",
    articleCategory: "국제제뉴스",
    articleContent: "정부는 소셜미디어 플랫폼의 부작용을 줄이기 위한 새로운 규제안을 발표했습니다. 가짜뉴스 확산 방지와 개인정보 보호 강화가 주요 목표이며, 플랫폼 운영사들은 규제 준수를 위해 내부 정책을 수정하고 있습니다. 이에 대한 사용자들의 반응도 엇갈리고 있습니다."
  },
  {
    articleId: 6,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "한국 영화, 국제 영화제에서 연이은 수상",
    articleCategory: "사회회뉴스",
    articleContent: "한국 영화가 국제 영화제에서 연달아 수상하며 주목받고 있습니다. 다양한 장르와 독창적인 스토리텔링이 관객과 심사위원의 마음을 사로잡았다는 평가입니다. 영화 관계자들은 글로벌 시장에서 한국 영화의 가능성을 낙관적으로 보고 있습니다."
  },
  {
    articleId: 7,
    articleImgUrl: "https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjJfMTA4/MDAxNzExMTEwMjYyOTAz.g7ZmBrlfHg5kcOeGiPllsi6ThyrbO2g9EpCOkNXogX0g.51P7cq29P-vZ8HIpr-UbhpF3lPZ9Y9fef6z-aoELGc8g.JPEG/ssaengcho-24%EB%85%84_4%EC%9B%94_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-PC.jpg?type=w800",
    articleTitle: "탄소중립 목표, 기업들의 역할이 중요해진다",
    articleCategory: "사회회뉴스",
    articleContent: "2050년 탄소중립 달성을 위한 기업들의 노력이 더욱 요구되고 있습니다. 신재생 에너지 투자와 친환경 제품 개발이 주요 과제로 떠오르는 가운데, 많은 기업들이 ESG 경영을 강화하고 있습니다. 하지만 비용 문제로 어려움을 겪는 기업도 많아 정부 지원이 필요한 상황입니다."
  },
  {
    articleId: 8,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "디지털 전환, 중소기업에도 필수 과제로 부상",
    articleCategory: "정치뉴스",
    articleContent: "디지털 전환이 대기업뿐만 아니라 중소기업에도 필수적인 과제로 떠오르고 있습니다. 전자상거래와 클라우드 기술 도입이 중소기업의 경쟁력을 강화시키는 핵심 요소로 평가받고 있습니다. 하지만 기술 격차를 해소하기 위한 교육과 지원책이 필요하다는 목소리도 나오고 있습니다."
  },
  {
    articleId: 9,
    articleImgUrl: "https://t1.daumcdn.net/cfile/tistory/25257E4753D84EE013",
    articleTitle: "우주 탐사 시대, 민간 기업의 도약",
    articleCategory: "사회회뉴스",
    articleContent: "민간 우주 기업들이 우주 탐사 시대를 선도하고 있습니다. 화성 탐사와 달 기지 건설 계획이 속속 발표되며, 새로운 기술과 자본이 이 분야로 집중되고 있습니다. 우주 관광 산업도 점차 현실화되고 있어 많은 이들의 기대를 모으고 있습니다."
  },
  {
    articleId: 10,
    articleImgUrl: "https://img.freepik.com/free-photo/macro-photography-gemstones_91008-496.jpg",
    articleTitle: "한국 전통문화, 세계 유산으로 인정받다",
    articleCategory: "정치뉴스",
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

const videoUrls = [
  {
    videoUrlId: 0,
    videoTitle: "정치 뉴스: 오늘의 주요 이슈",
    videoUrl: "https://www.youtube.com/watch?v=A0plb7gdzW4&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=4"
  },
  {
    videoUrlId: 1,
    videoTitle: "속보: 주요 사건 발생",
    videoUrl: "https://www.youtube.com/watch?v=By2_SOQH9PA&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=2"
  },
  {
    videoUrlId: 2,
    videoTitle: "스포츠 하이라이트: 이번 주 최고의 순간, 스포츠 하이라이트: 이번 주 최고의 순간",
    videoUrl: "https://www.youtube.com/watch?v=QjrkrVmC-8M&list=RDEMX34fctbVSPWQp64-WXPGCQ&start_radio=1"
  },
  {
    videoUrlId: 3,
    videoTitle: "글로벌 경제: 최신 시장 동향",
    videoUrl: "https://www.youtube.com/watch?v=SuCZ5g8Kr2M&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=3"
  },
  {
    videoUrlId: 4,
    videoTitle: "정치 뉴스: 오늘의 주요 이슈",
    videoUrl: "https://www.youtube.com/watch?v=A0plb7gdzW4&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=4"
  },
  {
    videoUrlId: 5,
    videoTitle: "기후 변화: 전문가들이 말하는 전망",
    videoUrl: "https://www.youtube.com/watch?v=CN-Ja6jCweA"
  },
  {
    videoUrlId: 6,
    videoTitle: "지역 뉴스: 우리 동네 소식",
    videoUrl: "https://www.youtube.com/watch?v=MT0xgNcOnsA&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=6"
  },
  {
    videoUrlId: 7,
    videoTitle: "테크놀로지: 새로운 혁신 제품 공개",
    videoUrl: "https://www.youtube.com/watch?v=PDoH2YnPg5U&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=7"
  },
  {
    videoUrlId: 8,
    videoTitle: "문화와 예술: 화제의 전시회 리뷰",
    videoUrl: "https://www.youtube.com/watch?v=-6YeAmmRdoA&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=8"
  },
  {
    videoUrlId: 9,
    videoTitle: "건강 정보: 전문가의 조언",
    videoUrl: "https://www.youtube.com/shorts/cqJQnAIbo5I"
  },
  {
    videoUrlId: 10,
    videoTitle: "여행 가이드: 꼭 가봐야 할 명소",
    videoUrl: "https://www.youtube.com/watch?v=CN-Ja6jCweA&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=10"
  },
  {
    videoUrlId: 11,
    videoTitle: "경제 전망: 이번 주 주요 경제 뉴스",
    videoUrl: "https://www.youtube.com/watch?v=QDahG-JSYZA&list=PLWF6SGjv2EJu66JbiHStk_EHyJ04pFeKs"
  },
  {
    videoUrlId: 12,
    videoTitle: "사회 문제: 주목해야 할 사건",
    videoUrl: "https://www.youtube.com/watch?v=VbB_aJ1Eh6s&list=RDEMX34fctbVSPWQp64-WXPGCQ&index=12"
  },
];

const bannerObj = [
  {
    bannerId: 0,
    bannerTitle: "속보: 국내 증시 사상 최고치 경신",
    bannerSubTitle: "전문가들, '시장의 강세가 지속될 것' 전망",
    bannerImgUrl: "https://i.namu.wiki/i/w7GkIKr6Qac-0SCYEn7DdYBpkpZed9FaVNTBFE7aIQvm7p39bo7gs2Pb1ZWfX3dPVd0JmA3oX50T5kl-MU7wfw.webp"
  },
  {
    bannerId: 1,
    bannerTitle: "스포츠: 지역 대표팀, 챔피언십 우승 쾌거 강세가 지속될 것 전망",
    bannerSubTitle: "감독, '선수들의 단합이 승리의 원동력'",
    bannerImgUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-small-white-rabbit-in-the-grass-image_2915502.jpg"
  },
  {
    bannerId: 2,
    bannerTitle: "날씨: 내일 전국에 강한 비 예보",
    bannerSubTitle: "기상청, '침수 피해 주의 및 대비 필요'",
    bannerImgUrl: "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13262118&filePath=L2Rpc2sxL25ld2RhdGEvMjAyMC8yMS9DTFMxMDAwNi82MmZhMWExMy03ZjRmLTQ1NWMtYTZlNy02ZTk2YjhjMjBkYTk=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006"
  },
  {
    bannerId: 3,
    bannerTitle: "기술: 최신 스마트폰 출시, 혁신적인 기능 주목",
    bannerSubTitle: "업계, '스마트폰 혁신이 새로운 트렌드 형성'",
    bannerImgUrl: "https://cdn.crowdpic.net/detail-thumb/thumb_d_2F583E5543F7E19139C6FCFFBF9607A6.jpg"
  },
  {
    bannerId: 4,
    bannerTitle: "건강: 전문가들이 추천하는 하루 10분 운동법",
    bannerSubTitle: "'간단한 스트레칭이 건강 유지에 효과적'",
    bannerImgUrl: "https://png.pngtree.com/thumb_back/fh260/background/20230316/pngtree-heaven-gate-ladder-background-image_1948845.jpg"
  },
];

const categories = [
  {
    categoryId: 0,
    categoryTitle: "정치뉴스"
  },
  {
    categoryId: 1,
    categoryTitle: "사회뉴스"
  },
  {
    categoryId: 2,
    categoryTitle: "국제뉴스"
  },
  {
    categoryId: 3,
    categoryTitle: "동영상"
  },
  {
    categoryId: 4,
    categoryTitle: "커뮤니티"
  }
]


export { articles, brandLogos, videoUrls, bannerObj, categories };