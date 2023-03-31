import styled from "styled-components";
import { Link } from "react-router-dom";

const PlayListContainer = styled.li`
  display: flex;
  justify-content: center;
  line-height: 4;
`;

const PlayListWrapper = styled.div`
  width: 100vw;
  max-width: 1440px;
  min-width: 300px;
  border: none;
  color: ${(props) => props.theme.mainText};
`;

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;

  > a {
    text-decoration: none;
  }

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
  &:hover {
    border-radius: 4px;
    background-color: ${(props) => props.theme.playListHover};
  }
`;

interface YoutubeDataProps {
  list: any;
}

function PlayList({ list }: YoutubeDataProps) {
  // console.log(list);
  return (
    <PlayListContainer>
      <PlayListWrapper>
        <Link to={list.url}>
          <ContentArea>
            <img className='thumbnail' src={list.thumbnail} alt='썸네일' />
            <div className='listTitle'>{list.title}</div>
          </ContentArea>
        </Link>
      </PlayListWrapper>
    </PlayListContainer>
  );
}

export default PlayList;

// import styled from "styled-components";

// const PlayListContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const PlayListWrapper = styled.div`
//   width: 100vw;
//   max-width: 1440px;
//   min-width: 300px;
//   border: none;
// `;

// const TitleArea = styled.div`
//   padding: 30px 10px 30px 10px;

//   .playListTitle {
//     color: ${(props) => props.theme.mainText};
//     font-size: 19px;
//     font-weight: 500;
//   }
// `;

// const ListContainer = styled.ul`
//   padding: 30px 5px 0 5px;
// `;

// const Lists = styled.li`
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   color: #323232;
//   padding: 10px 0 10px 0;
//   margin-bottom: 1rem;

//   > .link {
//     color: black;
//     color: ${(props) => props.theme.subText};
//   }
//   > img {
//     margin: 0 20px 0 15px;
//     width: 45px;
//     height: 45px;
//     border-radius: 4px;
//   }

//   > .listTitle {
//     padding-left: 19px;
//     flex: 8;
//   }

//   > .listArtist {
//     flex: 4;
//   }

//   > .listAlbum {
//     flex: 4;
//   }

//   > .listTime {
//     flex: 2;
//   }

//   > .test {
//     flex: 0.5;
//     padding-right: 10px;
//   }

//   &:hover {
//     border-radius: 4px;
//     background-color: ${(props) => props.theme.playListHover};
//   }
// `;

// function PlayList() {
//   const arr2 = {
//     list: [
//       {
//         link: "https://www.youtube.com/watch?v=bkEpWA-4FfU",
//       },
//       {
//         link: "https://www.youtube.com/watch?v=Km71Rr9K-Bw",
//       },
//     ],
//   };

//   return (
//     <PlayListContainer>
//       <PlayListWrapper>
//         <TitleArea>
//           <div className='playListTitle'>다이어리 수록곡</div>
//           <ListContainer>
//             {arr2.list.map((val, idx) => {
//               return (
//                 <Lists key={idx}>
//                   <a className='link' href='https://www.youtube.com/watch?v=bkEpWA-4FfU'>
//                     {val.link}
//                   </a>
//                 </Lists>
//               );
//             })}
//           </ListContainer>
//         </TitleArea>
//       </PlayListWrapper>
//     </PlayListContainer>
//   );
// }

// export default PlayList;
