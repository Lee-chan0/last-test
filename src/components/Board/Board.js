import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  padding : 0 24px;

`;

const BoardToQuill = styled.div`
  height: 500px;
`;

function Board({ setArticleValues }) {
  const quillRef = useRef(null); // quill에디터가 생성될 DOM엘리먼트를 참조

  useEffect(() => {
    if (!quillRef.current) return;
    const quillInstance = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"]
        ]
      }
    })

    quillInstance.on("text-change", () => {
      setArticleValues((prev) => ({
        ...prev,
        articleContent: quillInstance.root.innerHTML
      }))
    })
  }, [setArticleValues]);

  return (
    <BoardContainer>
      <BoardToQuill ref={quillRef} style={{ borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', marginBottom: '24px' }} />
    </BoardContainer>
  )
}

export default Board;