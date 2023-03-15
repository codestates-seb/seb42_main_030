import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const DiaryMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ListTab = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 50px;
  column-gap: 10px;

  .tab {
    width: 100px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
    text-align: center;
    padding: 7px 7px;
    color: ${(props) => props.theme.text};

    > .el {
      margin-top: 2px;
      color: #21252b;
    }
  }

  .focused {
    color: black;
    border: 2px solid ${(props) => props.theme.text};
    font-weight: bold;
    color: ${(props) => props.theme.text};
  }
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
  gap: 56.6px;
`;

export interface IDiaryData {
  diary_id: number;
  nickname: string;
  title: string;
  body: string;
  like: number;
  tag: string[];
  createdAt: string;
  modifiedAt: string;
  viewcount: number;
}

function DiaryMain() {
  const [diaryData, setDiaryData] = useState<IDiaryData[]>([]); // 전체 diary 데이터
  const [currentTab, setCurrentTab] = useState<number>(0); // 탭 이동 상태
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호 (기본값: 1페이지부터 노출)
  const limit: number = 20;
  const offset: number = (page - 1) * limit; // 각 페이지에서 첫 데이터의 위치(index) 계산

  // Get
  const getDiaryData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/diary");
      setDiaryData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDiaryData();
  }, []);

  // 태그 리스트
  const tagArr = [
    { feel: "신나는" },
    { feel: "감성적인" },
    { feel: "잔잔한" },
    { feel: "애절한" },
    { feel: "그루브한" },
    { feel: "몽환적인" },
    { feel: "애절한" },
    { feel: "청량한" },
  ];

  const selectTagHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <main>
      <ListTab>
        {tagArr.map((tab, index) => {
          return (
            <li
              key={index}
              className={currentTab === index ? "tab focused" : "tab"}
              onClick={() => selectTagHandler(index)}
            >
              <div className='el'>{tab.feel}</div>
            </li>
          );
        })}
      </ListTab>
      <DiaryMainContainer>
        <DiaryMainWrapper>
          {diaryData.slice(offset, offset + limit).map((value) => {
            return <DiaryList list={value} key={value.diary_id} />;
          })}
        </DiaryMainWrapper>
      </DiaryMainContainer>
      <Pagination
        allPageLength={diaryData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </main>
  );
}

export default DiaryMain;
