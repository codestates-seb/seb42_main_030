import styled from "styled-components";
import PlayList from "../DetailDiary/PlayList";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryDataProps } from "../../util/Type";
import { TOKEN_API } from "../../util/API";

const EditMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EditMainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;

const TitleArea = styled.div`
  height: 90px;
  display: flex;
  white-space: normal;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 10px 0 10px;

  > .EditTitle {
    width: 580px;
    font-size: 24px;
    color: ${(props) => props.theme.mainText};
    background-color: ${(props) => props.theme.background};
    font-weight: 600;
    padding: 10px 8px 10px 8px;
    border: none;
    border-radius: 4px;
    outline: 0.5px solid ${(props) => props.theme.editBorder};
    &:focus {
      outline: 1px solid ${(props) => props.theme.editBorder};
    }
  }
`;

const EditButton = styled.button`
  font-size: 13px;
  color: #1c1a16;
  font-weight: 700;
  background-color: #ffefd5;
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ffdeb7;
  }
`;

const AlbumCoverArea = styled.div`
  display: flex;
  margin: 30px 0 30px 0;

  > .coverImg {
    width: 190px;
    height: 180px;
    margin-right: 30px;
    border-radius: 4px;
    background-color: lightgray;
  }
`;

const InfoArea = styled.div`
  width: 400px;
  margin-top: 5px;
`;

const UserInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.subText};

  > .text {
    color: ${(props) => props.theme.mainText};
    font-size: 13px;
    margin-right: 50px;
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    color: ${(props) => props.theme.mainText};
    background-color: ${(props) => props.theme.background};
    width: 100%;
    height: 200px;
    font-size: 14px;
    resize: none;
    padding: 10px 8px 10px 8px;
    border-radius: 4px;
    border: none;
    outline: 0.5px solid ${(props) => props.theme.editBorder};
    &:focus {
      outline: 1px solid ${(props) => props.theme.editBorder};
    }
  }
`;

function EditList({ list }: DiaryDataProps) {
  const [editTitle, setEditTitle] = useState<string>(list.title);
  const [editBody, setEditBody] = useState<string>(list.body);

  const navigate = useNavigate();
  const { diaryId } = useParams();

  // 다이어리 patch 요청
  const submitHandler = async () => {
    const newDiary = {
      title: editTitle,
      body: editBody,
    };
    await TOKEN_API.patch(`/diary/${diaryId}`, newDiary);
    navigate(`/DetailDiary/${diaryId}`);
  };

  // 제목 수정 체인지 이벤트
  const changeEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  // 본문 수정 체인지 이벤트
  const changeEditBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditBody(e.target.value);
  };

  return (
    <EditMainContainer>
      <EditMainWrapper>
        <TitleArea>
          <input
            className='EditTitle'
            type='text'
            value={editTitle}
            placeholder='제목을 입력하세요'
            onChange={changeEditTitle}
          />
          <EditButton
            className='EditButton'
            onClick={submitHandler}
            disabled={editTitle.length === 0}
          >
            수정하기
          </EditButton>
        </TitleArea>
        <AlbumCoverArea>
          <div className='coverImg'></div>
          <InfoArea>
            <UserInfo>
              <span className='text'>등록자</span>
              {list.userNickname}
            </UserInfo>
            <UserInfo>
              <span className='text'>등록일</span>
              {list.createdAt.substring(0, 10)}
            </UserInfo>
          </InfoArea>
        </AlbumCoverArea>
        <AlbumInfoArea>
          <div className='playTitle'>다이어리 소개</div>
          <textarea
            className='playContent'
            value={editBody}
            placeholder='나만의 다이어리를 작성해 보세요'
            onChange={changeEditBody}
          />
        </AlbumInfoArea>
        <PlayList />
      </EditMainWrapper>
    </EditMainContainer>
  );
}

export default EditList;
