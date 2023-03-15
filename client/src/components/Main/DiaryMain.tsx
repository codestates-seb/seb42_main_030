import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const DiaryMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DiaryMainWrapper = styled.ul`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px 0 15px;
`;

export interface IDiaryData {
  id: number;
  title: string;
  body: string;
  like: number;
}

function DiaryMain() {
  const [diaryData, setDiaryData] = useState<IDiaryData[]>([]); // 전체 diary 데이터
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호 (기본값: 1페이지부터 노출)
  const limit: number = 20;
  const offset: number = (page - 1) * limit; // 각 페이지에서 첫 데이터의 위치(index) 계산

  // Get
  const getDiaryData = async () => {
    const res = await axios.get("http://localhost:3001/diarys");
    setDiaryData(res.data);
  };
  useEffect(() => {
    getDiaryData();
  }, []);

  return (
    <>
      <DiaryMainContainer>
        <DiaryMainWrapper>
          {diaryData.slice(offset, offset + limit).map((value) => {
            return <DiaryList list={value} key={value.id} />;
          })}
        </DiaryMainWrapper>
      </DiaryMainContainer>
      <Pagination
        allPageLength={diaryData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
}

export default DiaryMain;
