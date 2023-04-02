import styled from "styled-components";
import { Link } from "react-router-dom";
import { PlaylistDataProps } from "../../util/Type";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
  color: ${(props) => props.theme.mainText};

  > a {
    text-decoration: none;
  }
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;

  > .thumbnail {
    width: 80px;
    height: 50px;
    margin-right: 20px;
  }

  > .listTitle {
    font-size: 15px;
    width: 100%;
    color: ${(props) => props.theme.mainText};
  }

  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.playListHover};
  }
`;

function DetailPlayList({ list }: PlaylistDataProps) {
  return (
    <PlayListContainer>
      <PlayListWrapper>
        <Link to={list.url!} target='_blank'>
          <ContentArea>
            <img className='thumbnail' src={list.thumbnail} alt='썸네일' />
            <div className='listTitle'>{list.title}</div>
          </ContentArea>
        </Link>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default DetailPlayList;
