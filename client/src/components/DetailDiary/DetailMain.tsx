import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailHeader from "./DetailHeader";
import Diary from "./Diary";
import PlayList from "./PlayList";
import styled from "styled-components";
import axios from "axios";
import CommentList from "./Comment";
import { DiaryData } from "../../Type";

const Container = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  padding: 0 10rem;
  margin: 0 auto;
`;

function DiaryMain() {
  const [detailData, setDetailData] = useState<DiaryData[]>([]);
  // const [commentData, setCommentData] = useState<IDiaryData[]>([])
  const { diary_id } = useParams();

  const getDetailData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/diary?diary_id=${diary_id}`
      );
      setDetailData(res.data);
      // setCommentData(res.data.comment)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <Container>
      {detailData.map((value) => (
        <DetailHeader detail={value} key={value.diaryId} />
      ))}
      {detailData.map((value) => {
        return <Diary detail={value} key={value.diaryId} />;
      })}
      <PlayList />
      {/* {
        detailData.map((value) => {
          return <CommentList />
        })
      } */}
    </Container>
  );
}

export default DiaryMain;
