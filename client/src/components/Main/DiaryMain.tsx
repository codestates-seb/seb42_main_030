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
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 50px;
  gap: 10px;

  .tab {
    font-size: 14px;
    font-weight: 500;
    width: 100px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
    text-align: center;
    padding: 7px 7px;
    &:hover {
      transform: scale(1.05);
      transition: 0.2s;
    }

    > .el {
      margin-top: 3px;
      color: gray;
    }
  }

  .focused {
    border: 3px solid #ffe575;
    background-color: #ffe575;

    > .el {
      margin-top: 1px;
      color: #21252b;
      font-weight: 600;
    }
  }
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  /* justify-content: center; */
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

  // 전체 diary 데이터 get 요청
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
    { feel: "전체" },
    { feel: "#신나는" },
    { feel: "#감성적인" },
    { feel: "#잔잔한" },
    { feel: "#애절한" },
    { feel: "#그루브한" },
    { feel: "#몽환적인" },
    { feel: "#어쿠스틱한" },
    { feel: "#청량한" },
  ];
  // 태그 선택 이벤트 핸들러
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
        {currentTab === 0 ? (
          <DiaryMainWrapper>
            {diaryData.slice(offset, offset + limit).map((value) => {
              return <DiaryList list={value} key={value.diary_id} />;
            })}
          </DiaryMainWrapper>
        ) : currentTab === 1 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[1].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 2 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[2].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 3 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[3].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 4 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[4].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 5 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[5].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 6 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[6].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : currentTab === 7 ? (
          <DiaryMainWrapper>
            {diaryData
              .filter((value) => value.tag.includes(tagArr[7].feel))
              .slice(offset, offset + limit)
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        ) : (
          <DiaryMainWrapper>
            {diaryData
              .slice(offset, offset + limit)
              .filter((value) => value.tag.includes(tagArr[8].feel))
              .map((value) => {
                return <DiaryList list={value} key={value.diary_id} />;
              })}
          </DiaryMainWrapper>
        )}
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