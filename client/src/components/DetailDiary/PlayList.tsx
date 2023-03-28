import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";

const PlayListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
`;

const TitleArea = styled.div`
  padding: 30px 10px 30px 10px;

  .playListTitle {
    font-size: 19px;
    font-weight: 500;
  }
`;

const ListContainer = styled.ul`
  padding: 30px 5px 0 5px;
`;

const ListHeader = styled.div`
  background-color: #ffefd5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 13px;
  color: #323232;
  font-weight: 500;
  margin-bottom: 10px;

  > .empty {
    width: 80px;
  }

  > .song {
    padding-left: 20px;
    flex: 8;
  }

  > .artist {
    flex: 4;
  }

  > .album {
    flex: 4;
  }

  > .time {
    flex: 2;
  }

  > .setting {
    flex: 0.5;
    padding-right: 10px;
  }
`;

const Lists = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #323232;
  padding: 10px 0 10px 0;
  margin-bottom:1rem;

  > .link {
    color:black;
  }
  > img {
    margin: 0 20px 0 15px;
    width: 45px;
    height: 45px;
    border-radius: 4px;
  }

  > .listTitle {
    padding-left: 19px;
    flex: 8;
  }

  > .listArtist {
    flex: 4;
  }

  > .listAlbum {
    flex: 4;
  }

  > .listTime {
    flex: 2;
  }

  > .test {
    flex: 0.5;
    padding-right: 10px;
  }

  &:hover {
    border-radius: 4px;
    background-color: #fefaf5;
  }
`;

function PlayList() {
  const arr = {
    list: [
      {
        img: "https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg",
        title: "운이 좋았지",
        artist: "권진아",
        album: "my heart",
      },
      {
        img: "https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg",
        title: "운이 좋았네용",
        artist: "권진아",
        album: "my heart",
      },
      {
        img: "https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg",
        title: "운이 좋았지요",
        artist: "권진아",
        album: "my heart",
      },
    ],
  };

  const arr2 = {
    list: [
      {
        link:"https://www.youtube.com/watch?v=bkEpWA-4FfU"
      },
      {
        link: "https://www.youtube.com/watch?v=Km71Rr9K-Bw"
      }
    ]
  }

  return (
    <PlayListContainer>
      <PlayListWrapper>
        <TitleArea>
          <div className='playListTitle'>다이어리 수록곡 링크</div>
          <ListContainer>
            {/* <ListHeader>
              <div className='empty'></div>
              <div className='song'>노래</div>
              <div className='artist'>아티스트</div>
              <div className='album'>앨범</div>
              <div className='time'>시간</div>
              <div className='setting'></div>
            </ListHeader> */}
            {/* {arr.list.map((list, idx) => (
              <Lists key={idx}>
                <img src={list.img} alt='앨범 이미지' />
                <div className='listTitle'>{list.title}</div>
                <div className='listArtist'>{list.artist}</div>
                <div className='listAlbum'>{list.album}</div>
                <div className='listTime'>3:42</div>
                <BsThreeDotsVertical className='test' />
              </Lists>
            ))} */}
            {
              arr2.list.map((val, idx) => {
                return(
                <Lists key={idx}>
                  <a className='link' href='https://www.youtube.com/watch?v=bkEpWA-4FfU'>{val.link}</a>
                </Lists>)
              })
            }
          </ListContainer>

        </TitleArea>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default PlayList;
