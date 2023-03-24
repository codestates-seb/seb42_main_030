import React,{useState} from 'react'
import styled from 'styled-components'
import { DiaryData } from './DetailMain'
import { CommentData } from './DetailMain'
const Container = styled.div`
  max-width:1440px;
  padding:2rem;
  /* height:100vh; */
  /* border:1px solid; */
`

const CommentWrap = styled.div`
  max-width:1440px;
  /* padding:2rem; */
  margin-top:1rem;
  border-top: 1px dotted;
  /* border-bottom:1px dotted; */
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
const CommentButton = styled.form`
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
  comment: CommentData
}


export default function CommentList({comment}: propsType) {

  const [click, setClick] = useState(false)
  
  const clickHandler = (e:any) => {
    setClick(!click)
    console.log(e)
  }
  
  return (
    <>
      <CommentWrap key={comment.diaryId}>
        <h5>{comment.userNickname}</h5>
        {!click && <p>{comment.body}</p>}
        {click && <input placeholder={comment.body}></input>}
        <CommentFooter>
          <h6>{comment.createdAt}</h6>
          <CommentButton>
            {click && <EditButton onClick={clickHandler}>확인</EditButton>}
            {!click && <EditButton onClick={clickHandler}>수정</EditButton>}
            <DeleteButton>삭제</DeleteButton>
          </CommentButton>
        </CommentFooter>
      </CommentWrap>
    </>
  )
}

        

            
            

            


