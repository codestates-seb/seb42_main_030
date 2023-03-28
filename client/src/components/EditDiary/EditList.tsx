import { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDataProps } from '../../util/Type';
import { BASE_API } from "../../util/API";
import PlayList from '../DetailDiary/PlayList';


const DetailMainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailMainWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  min-width: 300px;
  padding: 10px 20px 10px 20px;
`;
const TitleArea = styled.div`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 0 10px 0 10px;

  > .DetailTitle {
    font-size: 19px;
    color: #21252b;
    font-weight: 600;
    width:100%;
    padding:1rem;
  }
`;
const ButtonArea = styled.div`
  display: flex;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    padding: 5px;
    background-color: transparent;
  }

  > .edit {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .like {
    color: #21252b;
    margin-left: 25px;
    width: 140px;
    height: 35px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;

    > .likeIcon {
      color: red;
      margin-right: 5px;
    }

    > .likeCount {
      margin-left: 5px;
    }

    &:hover {
      background-color: #eeeeee;
    }
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

  > .text {
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
    display:inline-block;
    width:80%;
  }

  > .playContent {
    font-size: 18px;
    width:100%;
    resize:none;
    height:7rem;
    padding:1rem;
  }
  

  
  > .editDiary {
    color: #21252b;
    margin-left: 25px;
    width: 140px;
    height: 35px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    background-color:transparent;
  }
`;

export default function EditList({ list }: DiaryDataProps) {
  const [newTitle, setNewTitle] = useState<string>(list.title)
  const [newBody, setNewBody] = useState<string>(list.body)
  const { diaryId } = useParams();
  const navigate = useNavigate()





  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiZGRhZHpAbmF2ZXIuY29tIiwic3ViIjoiZGRhZHpAbmF2ZXIuY29tIiwiaWF0IjoxNjc5OTE3ODI3LCJleHAiOjE2ODA1MTc4Mjd9.InKMqa_ozFhKP-TNbUceA2nk3f9uPY5umYFxadKn-4uGgf4tW3nfbBDrK3nVXYLhu00ie1BExiJpeDCrFgX2RQ'

  const editTitleBody = async () => {
    
    const newDiary = {
      title: newTitle,
      body: newBody
    };

    await BASE_API.patch(`/diary/${diaryId}`, newDiary, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    navigate(`/DetailDiary/${diaryId}`)

  };


  const bodyChangeHandler = (e: any) => {
    setNewBody(e.target.value)
  }

  const titleCHangeHandler = (e: any) => {
    setNewTitle(e.target.value)
  }


  return (
    <DetailMainContainer>
      {
        list
        &&
        
        <DetailMainWrapper>
          <TitleArea>
            <input
              className='DetailTitle'
              value={newTitle}
              onChange={titleCHangeHandler}
            />
            <ButtonArea>
              <button className='like' onClick={editTitleBody}>
                수정 하기
              </button>
            </ButtonArea>
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
              value={newBody}
              onChange={bodyChangeHandler}
            />
          </AlbumInfoArea>
          <PlayList />
        </DetailMainWrapper>
      }
    </DetailMainContainer>
  )
}


















