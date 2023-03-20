import React from 'react'
import styled from 'styled-components'

const ListContainer = styled.ul`
  margin-top:1rem;
  padding: 1rem;
`
const Lists = styled.li`
  display:flex;
  align-items:center;
  margin-bottom:1rem;
`
const ListCheckbox = styled.input`
  margin-right:1rem;
`
const ListImg = styled.img`
  width:50px;
  height:50px;
`
const ListTitle = styled.h3`
  margin-left:1rem;
  width:470px;
`
const ListArtist = styled.h3`
  width:200px;
`
const ListAlbum = styled.h3`
  /* margin-left:1rem; */
  width:170px;
`

export default function List() {
  const arr = {
    list:[
      {
        img: 'https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg',
        title: '운이 좋았지',
        artist: '권진아',
        album: 'my heart',
      },
      {
        img: 'https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg',
        title: '운이 좋았네용',
        artist: '권진아',
        album: 'my heart',
      },
      {
        img: 'https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg',
        title: '운이 좋았지요',
        artist: '권진아',
        album: 'my heart',
      }
    ]
  }




  return (
    <ListContainer>
      {
        arr.list.map((list,idx) => (
          <Lists key={idx}>
            <ListCheckbox type='checkbox'/>
            <ListImg src={list.img} alt="앨범 이미지" />
            <ListTitle>{list.title}</ListTitle>
            <ListArtist>{list.artist}</ListArtist>
            <ListAlbum>{list.album}</ListAlbum>
          </Lists>
        ))
      }
    </ListContainer>
  )
}

