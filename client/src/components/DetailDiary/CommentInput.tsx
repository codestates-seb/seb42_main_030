import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Comment from './Comment'
const Container = styled.div`
  max-width:1440px;
  padding:2rem;
  /* border:1px solid; */
  display:flex;
  flex-direction:column;
`
const Title = styled.div`
  display:flex;
  justify-content:space-between;
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
const PrincipalButton = styled.button`
  background-color:white;
  padding:1rem;
`


export default function CommentInput() {
  const [text, setText] = useState('')

  const changeHandler = (e: any) => {
    setText(e.target.value)
  }
  const submitHandler = () => {
    axios
  .post(`http://localhost:3001/diary`, {
    comment: {text},
    description: 'Unmissable Japanese Sushi restaurant. The cheese and salmon makis are delicious',
    categories: [3],
  })
  .then(response => {
    console.log(response);
  });
  }
  return (
    <Container>
      <Title>
        <h1>댓글달기</h1>
        <PrincipalButton>댓글 운영 원칙</PrincipalButton>
      </Title>
      <Form onSubmit={submitHandler}>
        <TextArea 
          placeholder='댓글을 남겨주세요~!'
          value={text}
          onChange={changeHandler}
        />
        <Button>등록</Button>
      </Form>
    </Container>

  )
}
