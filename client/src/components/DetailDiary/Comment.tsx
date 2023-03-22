import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
// import Comment from './Comment'
import Modal from './Modal'
import { useParams } from 'react-router-dom'
// import CommentList from './CommentList'
// import { IDiaryData } from './DetailMain'


const Container = styled.div`
  max-width:1440px;
  /* height:100vh; */
  padding:2rem;

`
const CommentInput = styled.div`
  display:flex;
  flex-direction:column;
  margin-bottom:1rem;
`
const InputTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Form = styled.form`
  display:flex;
  align-items:center;
  margin-top:1rem;
  width:100%;
  /* border:1px solid; */
`
const TextArea = styled.textarea`
  padding:1rem;
  width:90%;
  height:8rem;
`
const Button = styled.button`
  margin-left:2% ;
  width:8%;
  height:8rem;

`


export default function Comment() {
  const [text, setText] = useState('')
  const{diary_id} = useParams()

  const changeHandler = (e: any) => {
    setText(e.target.value)
  }
  
  const submitHandler = async () => {
    const newComment = {
      comment: [{
        
        body:text,
        createAt: "2023-3-19",
        modifedAt: "2023-03-19"
      }]
    }
    await axios.patch(`http://localhost:3001/diary?diary_id=${diary_id}`, newComment);
  }

  return (
    <Container>
      <CommentInput>
        <InputTitle>
          <h1>댓글 달기</h1>
          <Modal />
        </InputTitle>
        <Form >
          <TextArea 
            placeholder='댓글을 남겨주세요~!'
            value={text}
            onChange={changeHandler}
          />
          <Button onClick={submitHandler}>등록</Button>
        </Form>
      </CommentInput>

      {/* <h1>댓글</h1> */}

    </Container>

  )
}
    
