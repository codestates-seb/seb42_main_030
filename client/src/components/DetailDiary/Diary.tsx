import React from 'react'
import styled from 'styled-components'
import { IDiaryData } from '../Main/DiaryMain'

const Container = styled.div`
  padding:2rem;
`
const H1 = styled.h1`
  margin-bottom: 2rem;
`
export interface propsType {
  detail: IDiaryData
}
export default function Diary() {
  return (
    <Container>
      <H1>내가 작성한 다이어리 ( 본인의 플레이리스트와 함께 작성한 다이어리가 들어 갈 곳)</H1>
      <div>
        {/* {detail.body} */}
      </div>
    </Container>
  )
}
