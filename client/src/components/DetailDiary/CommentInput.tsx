import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import Comment from './Comment'
import Modal from "./Modal";
import { useParams } from "react-router-dom";
// import CommentList from './CommentList'
import { DiaryData } from "../../util/Type";

const Container = styled.div`
  max-width: 1440px;
  /* height:100vh; */
  padding: 2rem;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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
  resize: none;
`;
const Button = styled.button`
  margin-left: 2%;
  width: 8%;
  height: 8rem;
  background-color: transparent;
`;

interface propsType {
  detail: DiaryData;
  getDetailData: any;
}

export default function CommentInput({ detail, getDetailData }: propsType) {
  const [text, setText] = useState("");
  const { diaryId } = useParams();

  const changeHandler = (e: any) => {
    setText(e.target.value);
  };
  const date = new Date();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const newComment = {
      // commentId: detail.comments.length + 1,
      diaryId: detail.diaryId,
      // body:text,
      // createAt: date,
      // modifedAt: date,
      // userNickname: detail.userNickname
    };

    const res = await axios.post(
      `http://ec2-15-164-230-157.ap-northeast-2.compute.amazonaws.com:8080/comment`,
      newComment
    );
    console.log(res);
    getDetailData(res.data);
  };

  return (
    <Container>
      <Input>
        <InputTitle>
          <h1>댓글 달기</h1>
          <Modal />
        </InputTitle>
        <Form onSubmit={submitHandler}>
          <TextArea placeholder='댓글을 남겨주세요~!' value={text} onChange={changeHandler} />
          <Button>등록</Button>
        </Form>
      </Input>

      {/* <h1>댓글</h1> */}
    </Container>
  );
}
