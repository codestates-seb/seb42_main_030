import React,{useState} from 'react'
import styled from 'styled-components'
import {AiFillHeart} from 'react-icons/ai'
import { DiaryData } from './DetailMain'
import axios from 'axios'


const Container = styled.div`
  max-width:1440px;
  padding:2rem;
`

const TitleWrap = styled.div`
  margin: 2rem 0;
  max-width: 1300px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`


const TitleLeft = styled.div`
  display: flex;
`;
const TitleRight = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: bold;
`

const Like = styled.a`
  margin-left: 1rem;
  padding: 0.5rem;
  background-color: white;
  border-radius:1rem;
  max-height:4rem;
  min-width:5rem;
  display:flex;
  align-items:center;
  gap:0.3rem;
  border:1px solid;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
  }
`

const LikeIcon = styled.span`
  color:red;
`
const UnlikeIcon = styled.span`
  color:black;
`
const Edit = styled.a`
  margin-left: 2rem;
  text-decoration: underline;
  min-width: 2rem;
`;
const Delete = styled.a`
  margin-left:1rem;
  text-decoration:underline;
  min-width:2rem;
  &:hover{
    cursor: pointer;
  }
`
const ImgWrap = styled.div`
  display:flex;
  flex-direction:row;
  position:relative;
  `

const Img = styled.img`
  width: 200px;
  height: 200px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  margin-left: 2rem;
`

const Writer = styled.div`
  display: flex;
  gap: 1rem;
`;
const H3 = styled.h3`
  margin-left:1rem;
  margin-bottom: 1rem;
  width:5rem;
  font-weight:normal;
`

const H4 = styled.h4`
  margin-left: 2rem;
  font-weight:normal;
`
const Tag = styled.ul`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 11rem;
  margin-left: 1rem;
  list-style: none;

  > li {
    margin-right: 5px;
    padding: 2px 5px 2px 5px;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
  }
`;





interface propsType {
  detail: DiaryData
  // diaryId: DiaryData
  getDetailData: any
}

export default function DetailHeader({ detail, getDetailData }: propsType) {
  
  const [checkLike, setCheckLike] = useState<boolean>(false);


  const plusLikeCount = async (diaryId: number) => {
    if (checkLike === false) {
      const like = {
        likeCount: detail.likeCount + 1,
      };
      const res = await axios.patch(
        `http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080/diary/${detail.diaryId}`,
        like
      );
      getDetailData(res.data);
    } else {
      const like = {
        likeCount: detail.likeCount - 1,
      };
      const res = await axios.patch(
        `http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080/diary/${detail.diaryId}`,
        like
      );
      getDetailData(res.data);
    }
  };

  const onClickLike = () => {
    setCheckLike(!checkLike);
  };

  const postDelete= async () => {
    const deleteDiary = window.confirm('정말 게시글을 삭제하시겠습니까?')
    if(deleteDiary === true) {
      const res = await axios.delete(`http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080/diary/${detail.diaryId}`)
      getDetailData(res.data)
      alert('삭제되었습니다.')
    } else {
      return;
    }
  }



  return (
    <Container>
      <TitleWrap>
        <TitleLeft>
          <Title>{detail.title}</Title>
          { checkLike && 
            <Like onClick={(() => {
                plusLikeCount(detail.diaryId)
                onClickLike()
              })}>
              <LikeIcon>
                <AiFillHeart />
              </LikeIcon>
              좋아요
              {detail.likeCount}
            </Like>
          }
          {
            !checkLike && 
            <Like onClick={(() => {
              plusLikeCount(detail.diaryId)
              onClickLike()
            })}>
              <UnlikeIcon>
                <AiFillHeart />
              </UnlikeIcon>
              좋아요
              {detail.likeCount}
            </Like>
          }
        </TitleLeft>
        <TitleRight>
          <Edit href='#'>수정</Edit>
          <Delete onClick={postDelete}>
            삭제
          </Delete>
        </TitleRight>
      </TitleWrap>
      <ImgWrap>
        <Img src='https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg' />
        <Info>
          <Writer>
            <H3>뮤직 pd</H3>
            <H4>{detail.userNickname}</H4>
            <H4>{detail.userNickname}</H4>
          </Writer>
          <Writer>
            <H3>등록일</H3>
            <H4>{detail.createdAt}</H4>
          </Writer>
          <Tag>
          {/* {detail.tag.map((value, index) => {
            return <li key={index}>{value}</li>;
          })} */}
          </Tag>
        </Info>
      </ImgWrap>
    </Container>
  );
}







