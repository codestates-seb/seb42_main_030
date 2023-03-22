import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "./Profile";

const MyInfoContainer = styled.div`
  width: 100vw;
  max-width: 900px;
  font-size: 15px;
  /* border: 1px solid red; */
`;

interface ImageDataProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  userData: any;
  getUserData: any;
}

export interface IUserData {
  id: number;
  nickname: string;
  email: string;
  password: string;
  imageUrl: string;
}

function MyInfo({ image, setImage, userData, getUserData }: ImageDataProps) {
  // const [userData, setUserData] = useState<IUserData[]>([]);

  // 나의 유저 정보만 불러오는 get 요청
  // const getUserData = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/user?id=1");
  //     setUserData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getUserData();
  // }, []);
  console.log(image);
  return (
    <MyInfoContainer>
      <ul>
        {userData.map((value: any) => {
          return (
            <Profile
              list={value}
              key={value.id}
              getUserData={getUserData}
              image={image}
              setImage={setImage}
            />
          );
        })}
      </ul>
    </MyInfoContainer>
  );
}

export default MyInfo;
