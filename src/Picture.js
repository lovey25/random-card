import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const StartBtn = styled.button`
  background-color: #feea4c;
  height: 150px;
  width: 400px;
  font-size: 3em;
  border-radius: 3em;
`;
const AnswerBtn = styled.button`
  border: 0;
  background-color: olive;
  font-size: 2em;
  width: 100%;
`;

export default function Picture({ present, setName, onStart, gogo }) {
  const [imgsrc, setImgsrc] = useState();
  const imgcomp = useRef();
  const [answer, setAnswer] = useState("?");

  useEffect(() => {
    if (present) {
      setImgsrc(require(`./img/${present["사진"]}.jpg`));
    }
  }, [present]);

  const reveal = () => {
    console.log("답");
    setAnswer(`${present["팀"]}팀 / ${present["이름"]} 님`);
  };

  return (
    <>
      <div>
        {present === null ? (
          <StartBtn onClick={onStart}>게임 시작!!</StartBtn>
        ) : (
          <div
            style={{
              height: "80vh",
              width: "50vw",
              lineHeight: "77px",
              border: "solid",
              margin: "auto",
            }}
          >
            <div
              style={{ width: "100%", height: "100%", textAlign: "center" }}
              onClick={gogo}
            >
              <img
                style={{
                  maxHeight: "100%",
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                }}
                src={imgsrc}
                alt="카드이미지"
                ref={imgcomp}
              />
            </div>
            <AnswerBtn onClick={reveal}>{answer}</AnswerBtn>
          </div>
        )}
      </div>
    </>
  );
}
