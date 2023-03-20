import React, {useState} from 'react'
import styled from 'styled-components'
import { IDiaryData } from './DetailMain'
// import { CommentType} from './DetailMain'
// import { CommentData } from './Comment'

const Container = styled.div`
  max-width:1440px;
  padding:2rem;
  border:1px solid;
  /* height: 100%; */
`
const CommentWrap = styled.div`
  max-width:1440px;
  padding:2rem;

  margin-top:1rem;
  border-top: 1px dotted;
  /* border-bottom: 1px dotted; */
  padding:1rem 0 1rem 1rem;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width:100%;
  height: 20%;
`

interface propsType {
  comment: IDiaryData
}

export default function CommentList({comment}: propsType ) {
  // const [comment,setComment] = useState<commentType[]>([])
  
  return (
    
      <CommentWrap>
        {
          comment.comment.map((value) => {
            return <h5></h5>
          })
        }
        {/* <h5>{detail.comment.nickname}</h5>
        <p>{comment.body}</p>
        <h6>{comment.createdAt}</h6> */}
      </CommentWrap>
        
  
  )
}

