import DetailHeader from "../components/DetailDiary/DetailHeader";
import LoginHeader from "../components/LoginHeader";
import Diary from "../components/DetailDiary/Diary";
import PlayList from "../components/DetailDiary/PlayList";
import CommentInput from "../components/DetailDiary/CommentInput";
import styled from "styled-components";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const Container = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  padding: 0 10rem;
  margin: 0 auto;
`;

export interface ICommentData {
  comment_id: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
}

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
  comment: ICommentData[];
}

function DetailDiary() {
  // const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  // const { diary_id } = useParams();

  // const getDetailData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:3001/diary?diary_id=${diary_id}`
  //   );
  //   setDetailData(res.data);
  //   console.log(res);
  // };

  // useEffect(() => {
  //   getDetailData();
  // }, []);

  return (
    <Container>
      <LoginHeader />
      <DetailHeader />
      <Diary />
      <PlayList />
      <CommentInput />
    </Container>
  );
}

export default DetailDiary;
