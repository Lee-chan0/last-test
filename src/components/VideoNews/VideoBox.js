import HomeNews from '../HomeNews/HomeNews';
import { videoUrls } from '../../mock';

export const getVideoId = (url) => {
  if (url.includes("youtube.com/shorts/")) {
    // 쇼츠 링크: shorts/ 뒤의 ID 추출
    const parts = url.split("/shorts/");
    return parts[1];
  } else if (url.includes("v=")) {
    // 일반 링크 또는 재생목록 링크: v= 뒤의 ID 추출
    const queryParams = url.split("?")[1].split("&");
    for (let param of queryParams) {
      if (param.startsWith("v=")) {
        return param.slice(2); // 'v=' 이후의 ID 반환
      }
    }
  }
  return null; // 비디오 ID를 찾지 못한 경우
};

function VideoBox({ articleType }) {
  const VideoArticleType = articleType;
  return <HomeNews articleType={VideoArticleType} videoUrls={videoUrls} />
}

export default VideoBox;