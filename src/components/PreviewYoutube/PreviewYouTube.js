import styled from "styled-components";
import YouTube from "react-youtube";
import { getVideoId } from "../VideoNews/VideoBox";
import { createPortal } from "react-dom";

const PreviewBox = styled.div`
  position : absolute;
  width: 60px;
  padding : 4px;
  transform: translateY(-100%);
  font-weight: bold;
  font-size : 14px;
  display : flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius : 4px;
  border-top-left-radius : 4px;

  background-color: ${({ theme }) => theme.blue.blue500};
  color : ${({ theme }) => theme.gray.gray100};
`;

const AbcBox = ({ x, y, children }) => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: `${y}px`,
        left: `${x}px`,
        zIndex: "100",
        width: "320px",
        height: "240px",
        transform: "translate(-50%, -70%)"
      }}
    >
      {children}
    </div>,
    document.body
  )
}

function PreviewYouTube({ x, y, videoUrl }) {
  return (
    <AbcBox x={x} y={y}>
      <PreviewBox>미리보기</PreviewBox>
      <YouTube
        style={{ position: "relative" }}
        videoId={getVideoId(videoUrl)}
        opts={{
          width: "400",
          height: "240",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
          }
        }}
      />
    </AbcBox>
  )
}

export default PreviewYouTube;