import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailHeader from "./DetailHeader";
import Diary from "./Diary";
import PlayList from "./PlayList";
import styled from "styled-components";
import axios from "axios";
import CommentList from './Comment'
import Comment from './CommentInput';

const Container = styled.div`
    width: 100vw;
    max-width: 1440px;
    min-width: 300px;
    padding: 0 10rem;
    margin:0 auto;
`
export interface IDiaryData {
  id: number;
  nickname: string;
  title: string;
  body: string;
  like: number;
  tag: string[];
  createdAt: string;
  modifiedAt: string;
  viewcount: number;
  comment: CommentData[]
}

export interface CommentData {
  comment_id: number;
  body: string;
  createAt: string;
  modifiedAt: string;
}
export default function EditDiary() {

  const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  const { diary_id } = useParams();
  const { nickname } = useParams()


  const getDetailData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/diary?diary_id=${diary_id}`);
      // setDetailData(res.data);
      const Data = JSON.stringify(res.data)
      window.localStorage.setItem('hello', Data)
      const data = JSON.parse(window.localStorage.getItem('hello') || '{}')
      setDetailData(data)
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    getDetailData();
    // const data = window.localStorage.getItem('hello')

  }, []);

  // const data = window.localStorage.getItem('hello')

  return (
    <Container>
      {/* {detailData[0].title}
      <DetailHeader detail={detailData[0]} />
      {
        detailData.map((value) => (
          <DetailHeader detail={value} getDetailData={getDetailData} key={value.id} />
        ))
      }
      {
        detailData.map((value) => {
          return <Diary detail={value} key={value.id} />
        })
      }
      <PlayList />
      <Comment />
      {
        detailData.map((value) => {
          return <CommentList detail={value} key={value.id} />
        })
      } */}
    </Container>
  );
}

