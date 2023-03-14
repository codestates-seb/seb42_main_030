import DiaryList from "./DiaryList";
import Pagination from "./Pagination";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const DiaryMainContainer = styled.div`
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
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
  const [diaryData, setDiaryData] = useState<IDiaryData[]>([]);

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
          {diaryData.map((value) => {
            return <DiaryList list={value} key={value.id} />;
          })}
        </DiaryMainWrapper>
      </DiaryMainContainer>
      <Pagination />
    </>
  );
}

export default DiaryMain;
