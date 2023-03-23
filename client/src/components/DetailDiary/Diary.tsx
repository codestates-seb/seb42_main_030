import React from 'react'
import styled from 'styled-components'
import { IDiaryData } from '../Main/DiaryMain'

const DiaryWrap = styled.div`
  padding:2rem;
`
const H1 = styled.h1`
  margin-bottom: 2rem;
`
interface propsType {
  detail: any
}
export default function Diary({detail}: propsType) {
  return (
    <DiaryWrap>
      <H1>음악과 함께 작성할 다이어리</H1>
      <div>
        {detail.body}
      </div>
    </DiaryWrap>
  )
}
