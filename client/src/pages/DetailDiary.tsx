import DetailHeader from '../components/DetailDiary/DetailHeader';
// import LoginHeader from '../components/LoginHeader';
import Diary from '../components/DetailDiary/Diary'
import PlayList from '../components/DetailDiary/PlayList';
// import CommentList from '../components/DetailDiary/CommentList';
import Comment from '../components/DetailDiary/Comment'
import styled from 'styled-components';
import  {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


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
}

// export interface CommentData {
//   commentId: number;
//   nickname: string;
//   body: string;
//   createdAt: string;
//   modifiedAt: string;
// }


function DetailDiary() {
  const [detailData, setDetailData] = useState<IDiaryData[]>([]);
  // const [commentData, setCommentData] = useState<CommentData[]>([])
  const { diary_id } = useParams();

  const getDetailData = async () => {
    try{
      const res = await axios.get(`http://localhost:3001/diary?diary_id=${diary_id}`);
    setDetailData(res.data);
    console.log(res.data)
  } catch (err) {
    console.error(err)
  };
}
    
  useEffect(() => {
    getDetailData();
  },[]);

  // const getCommentData = async () => {
  //   const comment = await axios.get(`http://localhost:3001/comment`)
  //   setCommentData(comment.data)
  // }
  // useEffect(() => {
  //   getCommentData();
  // },[]);
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
      <Comment />
      {/* <h1>댓글</h1> */}
      {/* {
        commentData.map((value) => {
          return <CommentList comment={value} key={value.commentId} />
        })
      } */}
    </Container>
  );
}



export default DetailDiary;
