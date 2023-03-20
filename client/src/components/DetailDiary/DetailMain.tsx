import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailHeader from "./DetailHeader";
import Diary from "./Diary";
import PlayList from "./PlayList";
import styled from "styled-components";
import axios from "axios";
import CommentList from './Comment'

const Container = styled.div`
    width: 100vw;
    max-width: 1440px;
    min-width: 300px;
    padding: 0 10rem;
    margin:0 auto;
`
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
  comment: object[]
}



function DiaryMain() {
  const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  // const [commentData, setCommentData] = useState<IDiaryData[]>([])
  const { diary_id } = useParams();

  const getDetailData = async () => {
    try{
      const res = await axios.get(`http://localhost:3001/diary?diary_id=${diary_id}`);
      setDetailData(res.data);
      // setCommentData(res.data.comment)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getDetailData();
  },[]);

  return (
    <Container>
      {
        detailData.map((value) => (
          <DetailHeader detail={value} key={value.diary_id} />
        ))
      }
      {
        detailData.map((value) => {
      return <Diary detail={value} key={value.diary_id}/>
        })
      }
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











