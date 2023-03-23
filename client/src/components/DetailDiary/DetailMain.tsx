import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DetailHeader from "./DetailHeader";
import Diary from "./Diary";
import PlayList from "./PlayList";
import styled from "styled-components";
import axios from "axios";
// import CommentList from './CommentList'
import Comment from './Comment';
// import EditHeader from './EditHeader';
import CommentInput from './CommentInput';




const Container = styled.div`
    width: 100vw;
    max-width: 1440px;
    min-width: 300px;
    padding: 0 10rem;
    margin:0 auto;
`

const DiaryWrap = styled.div`
  padding:2rem;
`
const H1 = styled.h1`
  margin-bottom: 2rem;
`
export interface IDiaryData {
  diaryId: number;
  title: string;
  body: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  comment: CommentData[]
  tag: string[];
  viewcount: number;
}

export interface CommentData {
  comment_id: number;
  diaryId: number;
  body: string;
  createAt: string;
  modifiedAt: string;
  userNickname:string;
}
  


function DetailMain() {
  const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  const { diaryId } = useParams();

  const getDetailData = async () => {
    try {
      const res = await axios.get(`http://ec2-43-201-65-82.ap-northeast-2.compute.amazonaws.com:8080/diary/${diaryId}`);
      setDetailData(res.data);
    } catch (err) {
      console.error(err)
    }
  }



  useEffect(() => {
    getDetailData();
  }, []);





  return (
    <Container>
      {detailData[0].title}
      <DetailHeader detail={detailData} getDetailData={getDetailData} />
      {/* {
        detailData.map((value) => (
          <DetailHeader detail={value} getDetailData={getDetailData} key={value.diaryId} />
        ))
      } */}
    {/* <DiaryWrap>
      <H1>음악과 함께 작성할 다이어리</H1>
      <div>
        {detailData.body}
      </div>
    </DiaryWrap> */}


      <Diary detail={detailData} />
      {/* {
        detailData.map((value) => {
          return <Diary detail={value} key={value.diaryId} />
        })
      } */}
      <PlayList />
      <CommentInput />
      {/* <Comment detail={detailData[0]}/> */}
      {/* {
        detailData.map((value) => {
          return <Comment detail={value} key={value.diaryId} />
        })
      } */}
    </Container>
  );
}



export default DetailMain;











