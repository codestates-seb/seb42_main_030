import React,{useState} from 'react'
import styled from 'styled-components'
import {CgDanger} from 'react-icons/cg'
import {MdOutlineDangerous} from 'react-icons/md'

const Button = styled.button`
display:flex;
align-items:center;
gap:0.5rem;
padding: 1rem 0 0 1rem;
background-color:transparent;
border:none;
&:hover{
  cursor: pointer;
}
`
const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;

`
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49,49,49,0.8);
`
const ModalContent = styled.div`
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%, -50%);
line-height: 2rem;
background: #f1f1f1;
padding: 2rem 2rem 2rem 2rem;
max-width: 600px;
min-width: 300px;
border-radius:2rem;
`
const ModalHeader = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding-bottom:1rem;
margin-bottom:1rem;
border-bottom: 1px solid gray;
`


const CloseModal = styled.button`
font-size:2rem;
background-color:transparent;
border:none;
&:hover {
  cursor:pointer
}
`

export default function CommentModal() {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }






  return (
    <>
      <Button
        onClick={toggleModal}
        className='btn-modal'
      >
        <CgDanger />
        댓글 운영 원칙
      </Button>
    {modal && (
        <Modal >
          <Overlay />
          <ModalContent >
            <ModalHeader>
              <h2>댓글 작성 주의사항</h2>
              <CloseModal
                onClick={toggleModal}
              > 
                <MdOutlineDangerous />
              </CloseModal>
            </ModalHeader>
            <p>
                1. 욕설 및 비방 글을 등록하지 말아 주세요<br/>
                2. 한 페이지 내에서 동일한 내용의 글을 반복적으로 3회 이상 등록하지 말아 주세요<br/>
                3. 홍보 및 상업성 글을 등록 하기 말아주세요<br/>
                4. 음란성 글을 등록 하지 말아주세요<br/>
                5. 악성코드를 유포 하지 말아주세요<br/>
                6. 본인 및 타인의 개인 정보를 유출 하지 말아 주세요<br/>
                7. 반사회성 글을 등록 하지 말아주세요<br/>
            </p>
          </ModalContent>
        </Modal> 
    )}
    </>



          

  )
        
}
