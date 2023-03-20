import "./App.css";
import { useState, useRef, useEffect } from "react";
import { getData } from "./utils";
import Picture from "./Picture";
import { Checkbox } from "./Checkbox";
import styled from "styled-components";

const FullContainer = styled.div`
  background-color: black;
  height: 94vh;
  display: flex;
  flex-direction: row;
  padding: 1em;
  color: white;
`;
const Left = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Right = styled.div`
  width: 30%;
  padding: 1em;
  overflow: auto;
  font-size: 2em;
`;

const createNestedArray = (data) => {
  const result = {};
  data.forEach((item) => {
    const { 담당, 팀 } = item;
    if (!result[담당]) {
      result[담당] = {};
    }
    if (!result[담당][팀]) {
      result[담당][팀] = 1;
    } else {
      result[담당][팀] = result[담당][팀] + 1;
    }
  });
  return result;
};

function createRandomArray(n) {
  // 1부터 n 까지의 숫자를 담은 배열 생성
  let array = Array.from({ length: n }, (v, i) => i + 1);

  // Fisher-Yates shuffle 알고리즘으로 배열 섞기
  for (let i = array.length - 1; i > 0; i--) {
    // 임의의 인덱스 j 생성 (0 이상 i 이하)
    let j = Math.floor(Math.random() * (i + 1));

    // array[i]와 array[j] 교환
    [array[i], array[j]] = [array[j], array[i]];
  }

  // 섞인 배열 리턴
  return array;
}

function App() {
  const [data, setData] = useState(null);
  const [arrdata, setArrdata] = useState({ 담당: ["팀"] });
  const [order, setOrder] = useState([]); // 게임순서를 저장하고 있는 배열

  const [present, setPresent] = useState(null); // 보여질 사진파일 이름
  const filter = useRef([]); // 선택된 팀 배열

  useEffect(() => {
    getData().then((data) => {
      setArrdata(createNestedArray(data));
      setData(data);
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push(data[i]["팀"]);
      }
      const set = new Set(temp);
      filter.current = [...set];
    });
  }, []);

  const startGame = () => {
    console.log("게임을 시작한다~");
    // 총 팀수
    const totalTeams = Object.values(arrdata).reduce(
      (acc, cur) => acc + Object.keys(cur).length,
      0
    );
    // 선택 안된 팀수
    const notSelectedNum = filter.current.length;

    if (totalTeams === notSelectedNum) {
      alert("팀을 선택하세요.");
      return;
    }
    const temp = { ...data };
    // data state를 필터링
    const max = Object.keys(temp).length - 1;
    for (let i = 0; i < max; i++) {
      for (let j = 0; j < filter.current.length; j++) {
        if (temp[i]["팀"] === filter.current[j]) {
          delete temp[i];
          break;
        }
      }
    }

    // 필요없는 columns 항목 삭제
    delete temp["columns"];

    setData(temp);
    setOrder(createRandomArray(Object.keys(temp).length));
  };

  const makeUpdate = () => {
    if (order.length !== 0 && Object.keys(data).length > 0) {
      console.log(Object.values(data)[order[0] - 1]);
      setPresent(Object.values(data)[order[0] - 1]);
    }
  };

  const gogo = () => {
    const temp = order;
    temp.shift();
    setOrder(temp);
    makeUpdate();
  };

  useEffect(() => {
    makeUpdate();
  }, [order]);

  const filterChange = (e) => {
    const text = e.target.id;
    if (!e.target.checked) {
      filter.current.push(text);
    } else {
      const idx = filter.current.findIndex((el) => el === text);
      filter.current.splice(idx, 1);
    }
  };

  return (
    <FullContainer>
      <Left id="left">
        <Picture present={present} onStart={startGame} gogo={gogo} />
      </Left>
      <Right>
        {Object.keys(arrdata).map((divitem, i) => {
          return (
            <div key={i}>
              <h3>{divitem}</h3>
              <div>
                {Object.entries(arrdata[divitem]).map(([k, value]) => {
                  return (
                    <Checkbox
                      key={`${k}j`}
                      value={k}
                      count={value}
                      onChange={filterChange}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </Right>
    </FullContainer>
  );
}

export default App;
