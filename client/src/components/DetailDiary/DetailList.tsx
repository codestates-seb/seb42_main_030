import styled from "styled-components";
import CommentList from "./CommentList";
import DetailPlayList from "./DetailPlayList";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { TOKEN_API } from "../../util/API";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import DOMPurify from "dompurify";

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
  border-bottom: 1px solid ${(props) => props.theme.detailLine};
  padding: 0 10px 0 10px;

  > .DetailTitle {
    width: 580px;
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
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
    cursor: pointer;
  }

  > .edit {
    width: 40px;
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .delete {
    width: 40px;
    color: ${(props) => props.theme.mainText};
    border: none;
    text-decoration: underline;
    font-weight: 600;
  }

  > .like {
    color: ${(props) => props.theme.mainText};
    margin-left: 25px;
    width: 140px;
    height: 35px;
    border: 1px solid ${(props) => props.theme.detailLine};
    border-radius: 4px;

    > .likeIcon {
      color: #ec1d36;
      margin-right: 5px;
    }

    > .likeCount {
      margin-left: 5px;
    }

    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }
`;

const DeleteModalBack = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const DeleteModalView = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  width: 430px;
  height: 220px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .deleteModalTitle {
    color: ${(props) => props.theme.mainText};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.subText};
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 50.5px;
  }

  > button {
    font-weight: 500;
    width: 215px;
    height: 50px;
    border: none;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }

  > .deleteCancelButton {
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.detailLine};
    border-right: 0.5px solid ${(props) => props.theme.detailLine};
    border-bottom-left-radius: 5px;
    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }

  > .deleteButton {
    color: #ec1d36;
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.detailLine};
    border-left: 0.5px solid ${(props) => props.theme.detailLine};
    border-bottom-right-radius: 5px;
    &:hover {
      background-color: ${(props) => props.theme.likeHover};
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
  color: ${(props) => props.theme.mainText};

  > .text {
    font-size: 13px;
    margin-right: 50px;
  }
`;

const AlbumInfoArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }

  > .playContent {
    font-size: 14px;
    color: ${(props) => props.theme.mainText};
  }
`;

const PlayListArea = styled.div`
  padding: 30px 10px 30px 10px;
  border-top: 1px solid ${(props) => props.theme.detailLine};

  > .playTitle {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${(props) => props.theme.mainText};
  }
`;

const CommentInputArea = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid ${(props) => props.theme.detailLine};
  padding: 30px 10px 30px 10px;

  > .commentTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.mainText};
    margin-bottom: 20px;

    > .commentCount {
      font-size: 19px;
      margin-left: 5px;
      font-weight: 500;
    }

    > .commentRule {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 5px;
      cursor: pointer;

      > .ruleIcon {
        margin-right: 5px;
      }
    }
  }
`;

const TextArea = styled.div`
  display: flex;

  > .textArea {
    color: ${(props) => props.theme.mainText};
    width: 1300px;
    height: 70px;
    resize: none;
    margin: 0 10px 30px 0;
    border-radius: 4px;
    padding: 10px 8px 10px 8px;
    border: none;
    border: 1px solid ${(props) => props.theme.disabledTagBorder};
    background-color: ${(props) => props.theme.disabledTagBackground};

    &:focus {
      outline: none;
    }
  }

  > .sumbit {
    width: 90px;
    min-width: 90px;
    height: 70px;
    border: none;
    color: #21252b;
    border-radius: 4px;
    background-color: ${(props) => props.theme.mainColor};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.buttonHover};
    }
  }
`;

const RuleModalView = styled.div`
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  width: 550px;
  height: 420px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .ruleModalTitle {
    color: ${(props) => props.theme.mainText};
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin: 30px 0 45px 0;
  }

  > .warningText {
    color: ${(props) => props.theme.subText};
    line-height: 30px;
    text-align: left;
    font-size: 15px;
    font-weight: 500;
    padding: 0 25px 0 25px;
    margin-bottom: 59px;
  }

  > button {
    font-weight: 500;
    width: 550px;
    height: 50px;
    color: white;
    border: none;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }

  > .confirmButton {
    color: ${(props) => props.theme.subText};
    font-weight: 600;
    background-color: transparent;
    border-top: 1px solid ${(props) => props.theme.detailLine};
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    &:hover {
      background-color: ${(props) => props.theme.likeHover};
    }
  }
`;

interface DiaryDataProps {
  list: DiaryData;
  getDetailData: React.Dispatch<React.SetStateAction<object>>;
  test: any;
}

function DetailList({ list, getDetailData, test }: DiaryDataProps) {
  const [checkLike, setCheckLike] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [withDrawalModalOpen, setWithdrawalModalOpen] = useState<boolean>(false);
  const [ruleModal, setRuleModal] = useState<boolean>(false);

  const commentData = list.comments; // 선택한 다이어리의 코멘트 정보
  const { diaryId } = useParams();
  const navigate = useNavigate();

  // 좋아요 버튼
  const plusLikeCount = async () => {
    if (checkLike === false) {
      const like = {
        likeCount: list.likeCount + 1,
      };
      const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
      getDetailData(res.data);
      setCheckLike(true);
    } else {
      const like = {
        likeCount: list.likeCount - 1,
      };
      const res = await TOKEN_API.patch(`/diary/${diaryId}`, like);
      getDetailData(res.data);
      setCheckLike(false);
    }
  };

  // 다이어리 삭제 모달 오픈 이벤트 핸들러
  const openModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 다이어리 삭제 모달 클로즈 이벤트 핸들러
  const closeModalHandler = () => {
    setWithdrawalModalOpen(!withDrawalModalOpen);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 선택한 다이어리 delete 요청
  const postDelete = async () => {
    const res = await TOKEN_API.delete(`/diary/${diaryId}`);
    getDetailData(res.data);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    navigate("/");
  };

  // 댓글 post 요청
  const submitHandler = async () => {
    const newComment = {
      diaryId: diaryId,
      body: text,
    };
    const res = await TOKEN_API.post(`/comment`, newComment);
    getDetailData(res.data);
    setText("");
  };

  // 댓글 작성 체인지 이벤트
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // 댓글 운영 원칙 오픈 모달 오픈 이벤트 핸들러
  const openRuleModalHandler = () => {
    setRuleModal(!ruleModal);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  // 댓글 운영 원칙 모달 클로즈 이벤트 핸들러
  const closeRuleModalHandler = () => {
    setRuleModal(!ruleModal);
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  // 수정 페이지로 이동
  const moveEditDiary = () => {
    navigate(`/EditDiary/${list.diaryId}`);
  };

  // console.log(test);

  return (
    <DetailMainContainer>
      <DetailMainWrapper>
        <TitleArea>
          <div className='DetailTitle'>{list.title}</div>
          <ButtonArea>
            <button className='edit' onClick={moveEditDiary}>
              수정
            </button>
            <button className='delete' onClick={openModalHandler}>
              삭제
            </button>
            {withDrawalModalOpen ? (
              <DeleteModalBack>
                <DeleteModalView>
                  <div className='deleteModalTitle'>다이어리를 삭제 하시겠습니까?</div>
                  <div className='warningText'>삭제한 다이어리는 복구되지 않습니다.</div>
                  <button className='deleteCancelButton' onClick={closeModalHandler}>
                    취소
                  </button>
                  <button
                    className='deleteButton'
                    onClick={() => {
                      postDelete();
                      closeModalHandler();
                    }}
                  >
                    삭제
                  </button>
                </DeleteModalView>
              </DeleteModalBack>
            ) : null}
            <button className='like' onClick={plusLikeCount}>
              {checkLike === true ? (
                <AiFillHeart className='likeIcon' size={16} />
              ) : (
                <AiOutlineHeart className='likeIcon' size={16} />
              )}
              좋아요
              <span className='likeCount'>{list.likeCount}</span>
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
          <div
            className='playContent'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(list.body) }}
          ></div>
        </AlbumInfoArea>
        {/* PlayList json 데이터 부분 */}
        <PlayListArea>
          <div className='playTitle'>다이어리 수록곡</div>
          {test?.map((value: any, index: any) => {
            return <DetailPlayList list={value} key={index} />;
          })}
        </PlayListArea>
        <CommentInputArea>
          <div className='commentTitle'>
            {/* <span className='commentCount'>댓글 ({commentData.length})</span> */}
            <div className='commentRule' onClick={openRuleModalHandler}>
              <RiErrorWarningLine className='ruleIcon' size={16} />
              댓글 운영 원칙
            </div>
            {ruleModal ? (
              <DeleteModalBack>
                <RuleModalView>
                  <div className='ruleModalTitle'>나만의 작은 음악 다이어리 댓글 운영 원칙</div>
                  <div className='warningText'>
                    <div>1. 욕설 및 비방 글을 등록하지 말아 주세요</div>
                    <div>
                      2. 한 페이지 내에서 동일한 내용의 글을 반복적으로 3회 이상 등록하지 말아
                      주세요.
                    </div>
                    <div>3. 홍보 및 상업성 글을 등록하지 말아 주세요.</div>
                    <div>4. 음란성 글을 등록하지 말아 주세요.</div>
                    <div>5. 악성코드를 유포하지 말아주세요.</div>
                    <div>6. 본인 및 타인의 개인 정보를 유출하지 말아 주세요.</div>
                    <div>7. 반사회성 글을 등록하지 말아주세요.</div>
                  </div>
                  <button className='confirmButton' onClick={closeRuleModalHandler}>
                    확인
                  </button>
                </RuleModalView>
              </DeleteModalBack>
            ) : null}
          </div>
          <TextArea>
            <textarea
              className='textArea'
              value={text}
              placeholder='댓글을 작성하세요'
              onChange={changeHandler}
            />
            <button className='sumbit' onClick={submitHandler} disabled={text.length === 0}>
              등록
            </button>
          </TextArea>
          {commentData?.map((value) => {
            return <CommentList list={value} key={value.commentId} getDetailData={getDetailData} />;
          })}
        </CommentInputArea>
      </DetailMainWrapper>
    </DetailMainContainer>
  );
}

export default DetailList;
