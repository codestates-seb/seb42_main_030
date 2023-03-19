import React,{useState} from 'react'
import styled from 'styled-components'
import {CgDanger} from 'react-icons/cg'
import {MdOutlineDangerous} from 'react-icons/md'

export default function Modal() {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const Button = styled.button`
  display:flex;
  align-items:center;
  gap:0.5rem;
  padding: 1rem 0 0 1rem;
  background-color:transparent;
  border:none;
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
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
`
const CloseModal = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  font-size:2rem;
  background-color:transparent;
  border:none;
`

  

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
            <h2>댓글 작성 주의사항 </h2>
            <p>
            1. 욕설 및 비방 글을 등록하지 말아 주세요<br/>
            2. 한 페이지 내에서 동일한 내용의 글을 반복적으로 3회 이상 등록하지 말아 주세요 (도배 글)<br/>
            3. 홍보 및 상업성 글을 등록 하기 말아주세요<br/>
            4. 음란성 글을 등록 하지 말아주세요<br/>
            5. 악성코드를 유포 하지 말아주세요<br/>
            6. 본인 및 타인의 개인 정보를 유출 하지 말아 주세요<br/>
            7. 반사회성 글을 등록 하지 말아주세요<br/>
            8. 기타 관리자, 혹은 아티스트나 소속사의 판단에 의해 제공 서비스와 관계없는 글을 등록한 경우
            </p>
            <CloseModal
            onClick={toggleModal }
            > 
            <MdOutlineDangerous />
            </CloseModal>
          </ModalContent>
        </Modal> 
    )}

    </>
          

  )
}
