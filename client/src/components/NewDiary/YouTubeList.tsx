import styled from "styled-components";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
  border-bottom: 1px solid lightgray;
  color: ${(props) => props.theme.mainText};
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;

  > .thumbnail {
    width: 80px;
    height: 50px;
    margin-right: 20px;
  }

  > .listTitle {
    font-size: 15px;
    width: 100%;
  }

  > .delete {
    width: 50px;
    color: #21252b;
    border: none;
    text-decoration: underline;
    font-weight: 600;
    font-size: 12px;
    margin: 5px;
    background-color: transparent;
  }
`;

interface YouTubeDataProps {
  list: any;
  plList: any;
  setPlList: any;
}

function YouTubeList({ list, plList, setPlList }: YouTubeDataProps) {
  const deleteList = (deleteId: any) => {
    setPlList(plList.filter((value: any) => value.channelId !== deleteId));
  };

  return (
    <PlayListContainer>
      <PlayListWrapper>
        <ContentArea>
          <img className='thumbnail' src={list.thumbnail} alt='썸네일' />
          <div className='listTitle'>{list.title}</div>
          <button className='delete' onClick={() => deleteList(list.channelId)}>
            삭제
          </button>
        </ContentArea>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default YouTubeList;
