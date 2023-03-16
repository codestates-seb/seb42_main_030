import DetailHeader from '../components/DetailDiary/DetailHeader';
import LoginHeader from '../components/LoginHeader';
import Diary from '../components/DetailDiary/Diary'
import PlayList from '../components/DetailDiary/PlayList';
import CommentInput from '../components/DetailDiary/CommentInput';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    max-width: 1440px;
    min-width: 300px;
    padding: 0 10rem;
`

function DetailDiary() {
  return (
    <Container>
      <LoginHeader />
      <DetailHeader />
      <Diary />
      <PlayList />
      <CommentInput />
    </Container>
  );
}

export default DetailDiary;
