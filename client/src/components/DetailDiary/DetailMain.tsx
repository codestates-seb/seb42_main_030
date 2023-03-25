import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DetailHeader from "./DetailHeader";
import PlayList from "./PlayList";
import CommentInput from './CommentInput';
import CommentList from './CommentList'






const Container = styled.div`
    width: 100vw;
    max-width: 1440px;
    min-width: 300px;
    padding: 0 5rem;
    margin:0 auto;
`

const DiaryWrap = styled.div`
  padding:2rem;
`
const H1 = styled.h1`
  margin-bottom: 2rem;
`
const CommentContainer = styled.div`
  max-width:1600px;
  padding:2rem;
  height:100vh;
  /* border:1px solid; */
`
export interface DiaryData {
  diaryId: number;
  title: string;
  body: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  userNickname: string;
  comments: CommentData[];
  tag: string[];

  // viewcount: number
}

export interface CommentData {
  commentId: number;
  diaryId: number;
  body: string;
  createdAt: string;
  modifiedAt: string;
  userNickname:string
}
  


export default function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();
  const { diaryId } = useParams();
  // http://ec2-43-201-65-82.ap-northeast-2.compute.amazonaws.com:8080/diary/${diaryId}
  const getDetailData = async () => {
    try {
      const res = await axios.get(`http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080/diary/${diaryId}`);
      setDetailData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      getDetailData();
    }, []);

  return (
    <Container>
      {/* {detailData && detailData.title} */}
      { detailData && <DetailHeader detail={detailData} getDetailData={getDetailData} /> }
      <DiaryWrap>
        <H1>음악과 함께 작성할 다이어리</H1>
        <div>
          {detailData && detailData.body}
        </div>
      </DiaryWrap>
      <PlayList />
      {detailData && <CommentInput detail={detailData} getDetailData={getDetailData}/> }
      <CommentContainer>
          <h1>댓글</h1>
          {detailData &&
            detailData.comments.map((value) => {
              return <CommentList comment={value} key={value.diaryId} />
            })
          }
      </CommentContainer>
    </Container>
  );
}























