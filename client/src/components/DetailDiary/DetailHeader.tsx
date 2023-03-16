// import React from 'react'
import styled from 'styled-components'
import {AiFillHeart} from 'react-icons/ai'
const Container = styled.div`
  max-width:1440px;
  padding:2rem;
  /* height:50%; */
  /* margin: 2rem 0.8rem; */
  /* position: relative; */
`
const TitleWrap = styled.div`
  /* padding:2rem; */
  margin: 2rem 0;
  width: 100%;
  /* border: 1px solid red; */
  display:flex;
  flex-direction:row;
  /* justify-content:left; */
  align-items:center;
`
const Title = styled.h1`
  font-weight: bold;
  /* border: 1px solid ; */
  /* width: 50%; */
  /* display: inline-block; */
  /* align-items:center */
  /* flex-basis: 30rem; */
`
const Like = styled.button`
  /* position:absolute; */
  margin-left: 2rem;
  padding: 0.5rem;
  background-color: white;
  border-radius:1rem;

  /* justify-self: end; */
`
const Edit = styled.a`
  margin-left: 28rem;
  text-decoration: underline;
`
const Delete = styled.a`
  margin-left:1rem;
  text-decoration:underline;
`
const ImgWrap = styled.div`
  display:flex;
  flex-direction:row;
  position:relative;
  /* height: 30%; */
  /* border:1px solid; */
  /* padding: 2rem; */
`
const Img = styled.img`
  width: 200px;
  height: 200px;
`
const Info = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  height: 200px;
  /* border:1px solid; */
  margin-left: 2rem;
`
const Writer = styled.div`
  display:flex;
  gap:1rem;
`
const H5 = styled.h3`
margin-left:1rem;
margin-bottom: 1rem;
/* display:inline-block; */
width:5rem;
`
const H55 = styled.h4`
  /* display: inline-block; */
  margin-left: 2rem;
  /* width:30rem; */
`
const Tags = styled.div`
  /* background-color:black; */
  position: absolute;
  top: 11rem;


`
const Tag = styled.button`
  font-weight:900;
  background-color: #f5f5efdb;
  border-radius:1rem;
  width:5rem;
  height:1.5rem;
  margin-left:1rem;
`
export default function DetailHeader() {
  return (
    <Container>
      <TitleWrap>
        <Title>코딩하기 힘들 때 듣기 좋은 노래</Title>
        <Like>
          <AiFillHeart />
          좋아요
        </Like>
        <Edit>수정</Edit>
        <Delete>삭제</Delete>
      </TitleWrap>
      <ImgWrap>
        <Img src='https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg' />
        <Info>
          <Writer>
            <H5>뮤직 pd</H5>
            <H55>한대희 피디</H55>
          </Writer>
          <Writer>
            <H5>등록일</H5>
            <H55>2023.03.15</H55>
          </Writer>
          <Tags>
            <Tag>즐거움</Tag>
            <Tag>상쾌한</Tag>
            <Tag>우울한</Tag>
          </Tags>
        </Info>
      </ImgWrap>
    </Container>
  )
}
        

        

