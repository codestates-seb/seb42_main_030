import React from 'react'
import styled from 'styled-components'
import { AiFillCaretRight } from 'react-icons/ai'
import List from './List'

const Container = styled.div`
  padding:2rem;
`
const ListTitle = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  border-bottom: 2px solid black;
  padding-bottom:2rem;
`
const H1 = styled.h1`
  display:inline-block;
`
const Button = styled.button`
  margin-left: 2rem;
`
const ListInfo = styled.div`
  display:flex;
  align-items:center;
  padding:1rem;
  border-bottom:1px solid;
`
const InfoInput = styled.div`
  width:79px;
  height:13px;
  /* background-color:black; */
  /* margin-right:1rem; */
`
const InfoImg = styled.div`
  width:50px;
  height:20px;
`
const InfoSong = styled.div`
  width:400px;
  height:20px;
  padding-left:1rem;
`
const InfoArtist = styled.div`
  width:200px;
  padding-left:1rem;
  /* background-color:black; */
`


const InfoAlbum = styled.div`
  padding-left:1rem;
  width:250px;
  /* background-color:black; */
`
const InfoListen = styled.div`
  width: 100px;
`
export default function PlayList() {
  return (
    <Container>
      <ListTitle>
        <H1>플레이 리스트</H1>
        <Button>
          <AiFillCaretRight />
          듣기
        </Button>
      </ListTitle>
      <ListInfo>
        <InfoInput></InfoInput>
        {/* <InfoImg></InfoImg> */}
        <InfoSong>곡</InfoSong>
        <InfoArtist>아티스트</InfoArtist>
        <InfoAlbum>앨범</InfoAlbum>
        <InfoListen>듣기</InfoListen>
      </ListInfo>
      <List />
    </Container>
  )
}




