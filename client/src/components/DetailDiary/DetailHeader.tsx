// import React from 'react'
import styled from 'styled-components'
import {AiFillHeart} from 'react-icons/ai'
import { IDiaryData } from '../Main/DiaryMain'
import axios from 'axios'


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
  max-width: 1300px;
  /* border: 1px solid red; */
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const TitleLeft = styled.div`
  display:flex;
`
const TitleRight = styled.div`
  display:flex;
`

const Title = styled.h1`
  font-weight: bold;
  /* border: 1px solid ; */
  /* max-width: 60%; */
  /* display: inline-block; */
  /* align-items:center */
  /* flex-basis: 30rem; */
`
const Like = styled.button`
  /* position:absolute; */
  margin-left: 1rem;
  padding: 0.5rem;
  background-color: white;
  border-radius:1rem;
  max-height:4rem;
  min-width:5rem;
  display:flex;
  align-items:center;
  gap:0.3rem;
`
const Edit = styled.a`
  margin-left: 2rem;
  text-decoration: underline;
  min-width:2rem;
`
const Delete = styled.a`
  margin-left:1rem;
  text-decoration:underline;
  min-width:2rem;
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
const H3 = styled.h3`
margin-left:1rem;
margin-bottom: 1rem;
/* display:inline-block; */
width:5rem;
font-weight:normal;
`
const H4 = styled.h4`
  /* display: inline-block; */
  margin-left: 2rem;
font-weight:normal;

  /* width:30rem; */
`

const Tag = styled.ul`
  display:flex;
  gap:0.5rem;
  position:absolute;
  top:11rem;
  margin-left:1rem;
  list-style:none;

  > li {
    margin-right: 5px;
    padding: 2px 5px 2px 5px;
    border: 1px solid #d1d1d1;
    border-radius: 50px;
  }
`

const postDelete= () => {
  axios.delete(`http://localhost:3001/diary?diary_id=2`)
    .then((res) => {
      console.log(res.data)
    } )
    .catch((err) => {
      console.log(err)
    })
}

interface propsType {
  detail: IDiaryData
}
export default function DetailHeader({detail}: propsType) {
  return (
    <Container>
      <TitleWrap>
        <TitleLeft>
          <Title>{detail.title}</Title>

          <Like>
            <AiFillHeart />
            좋아요
            {detail.like}
          </Like>
        </TitleLeft>
        <TitleRight>
          <Edit href="http://www.naver.com">수정</Edit>
          <Delete onClick={postDelete}>삭제</Delete>
        </TitleRight>

      </TitleWrap>
      <ImgWrap>
        <Img src='https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg' />
        <Info>
          <Writer>
            <H3>뮤직 pd</H3>
            <H4>{detail.nickname}</H4>
          </Writer>
          <Writer>
            <H3>등록일</H3>
            <H4>{detail.createdAt}</H4>
          </Writer>
          <Tag>
          {detail.tag.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
          </Tag>
        </Info>
      </ImgWrap>
    </Container>
  )
}
        

        

