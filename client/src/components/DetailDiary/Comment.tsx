import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import Comment from './Comment'
import Modal from "./Modal";
// import CommentList from "./CommentList";
import { DiaryData } from "../../Type";

const Container = styled.div`
  max-width: 1440px;
  height: 100vh;
  padding: 2rem;
  /* border:1px solid; */
  /* display:flex;
  flex-direction:column; */
`;
const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;
const InputTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  /* border:1px solid; */
`;
const TextArea = styled.textarea`
  padding: 1rem;
  width: 90%;
  height: 8rem;
`;
const Button = styled.button`
  margin-left: 2%;
  width: 8%;
  height: 8rem;
`;

// export interface CommentData {
//   commentId: number;
//   nickname: string;
//   body: string;
//   createdAt: string;
//   modifiedAt: string;
// }
interface propsType {
  detail: DiaryData;
}
export default function Comment({ detail }: propsType) {
  const [text, setText] = useState("");
  // const [commentData, setCommentData] = useState<CommentData[]>([])

  const changeHandler = (e: any) => {
    setText(e.target.value);
  };

  const submitHandler = async (e: any) => {
    e.prevendDefault();

    axios
      .post(`http://localhost:3001/comment`, {
        commentId: 2,
        nickname: "hdh",
        body: "잘 보고 갑니다",
        createdAt: "2023-03-18",
        modifiedAt: "2023-03-18",
      })
      .then((response) => {
        console.log(response);
      });
  };

  // const getCommentData = async () => {
  //   const comment = await axios.get(`http://localhost:3001/diary`)
  //   setCommentData(comment.data)
  // };

  // useEffect(() => {
  //   getCommentData();
  // },[]);

  return (
    <Container>
      <CommentInput>
        <InputTitle>
          <h1>댓글 달기</h1>
          <Modal />
        </InputTitle>
        <Form onSubmit={submitHandler}>
          <TextArea
            placeholder='댓글을 남겨주세요~!'
            value={text}
            onChange={changeHandler}
          />
          <Button>등록</Button>
        </Form>
      </CommentInput>

      <h1>댓글</h1>
      {/* <CommentList /> */}
      {/* {
        commentData.map((value) => {
          return <CommentList comment={value} key={value.commentId} />
        })
      } */}
    </Container>
  );
}

