import React from "react";
import styled from "styled-components";
import { DiaryData } from "../../util/Type";

const Container = styled.div`
  padding: 2rem;
`;
const H1 = styled.h1`
  margin-bottom: 2rem;
`;
interface propsType {
  detail: DiaryData;
}
export default function Diary({ detail }: propsType) {
  return (
    <Container>
      <H1>음악과 함께 작성할 다이어리</H1>
      <div>{detail.body}</div>
    </Container>
  );
}
