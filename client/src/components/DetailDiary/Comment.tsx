import React, {useState} from 'react'
import styled from 'styled-components'
import { IDiaryData } from './DetailMain'
import CommentList from './CommentList'
// import { CommentType} from './DetailMain'
import { CommentData } from './DetailMain'

const Container = styled.div`
  max-width:1440px;
  padding:2rem;
  height:100vh;
  /* border:1px solid; */
`

const CommentWrap = styled.div`
  max-width:1440px;
  padding:2rem;
  margin-top:1rem;
  border-top: 1px dotted;
  padding:1rem 0 1rem 1rem;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:100%;
  height: 20%;
`
const CommentFooter = styled.div`
  display:flex;
  justify-content:space-between;
`
const CommentButton = styled.div`
  display:flex;
  gap:1rem;
`

const EditButton = styled.button`
  background-color:transparent;
  border:none;
  &:hover{
    cursor: pointer;
    color: blue;
  }
  &:active{

  }
`
const DeleteButton = styled.button`
  background-color:transparent;
  border:none;
  &:hover{
    cursor: pointer;
    color:blue;
  }
`

interface propsType {
  detail: IDiaryData
}



export default function Comment({detail}: propsType) {
  // const [comment,setComment] = useState<commentType[]>([])
  // const [click, setClick] = useState(false)
  
  // const clickHandler = (e:any) => {
  //   setClick(!click)
  //   console.log(e)
  // }
  return (

    <Container>
      <h1>댓글</h1>
      {/* {
        detail.comment.map((value) => {
          return (
            <CommentList data={detail} comment={value}  key={value.comment_id}/>
          <CommentWrap key={value.comment_id}>
            <h5>{detail.nickname}</h5>
            {!click && <p>{value.body}</p>}
            <p>{value.body}</p>
            <CommentFooter>
              <h6>{detail.createdAt}</h6>
              <CommentButton>
                <EditButton onClick={clickHandler}>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
              </CommentButton>
            </CommentFooter>
            <h6>{detail.createdAt}</h6>
          </CommentWrap>
          )
        
        })
      } */}
      {/* {
        click && 
        detail.comment.map((value) => {
          return (
          <CommentWrap key={value.comment_id}>
            <h5>{detail.nickname}</h5>
            <input placeholder={value.body}></input>
            <CommentFooter>
              <h6>{detail.createdAt}</h6>
              <CommentButton>
                <EditButton onClick={clickHandler}>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
              </CommentButton>
            </CommentFooter>

          </CommentWrap>)
        }
        )
      } */}
      {/* {
        detail.comment.map((value) => {
          return (
          <CommentWrap key={value.comment_id}>
            <h5>{detail.nickname}</h5>
            <p>{value.body}</p>
            <CommentFooter>
              <h6>{detail.createdAt}</h6>
              <CommentButton>
                <EditButton onClick={clickHandler}>수정</EditButton>
                <DeleteButton>삭제</DeleteButton>
              </CommentButton>
            </CommentFooter>
            <h6>{detail.createdAt}</h6>
          </CommentWrap>)
        }
        )
      } */}
    </Container>
  )
}







      

    


