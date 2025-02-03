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


export { brandLogos, videoUrls };