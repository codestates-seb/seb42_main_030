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

export interface IUserData {
  id: number;
  nickname: string;
  email: string;
  password: string;
  imageUrl: string;
}

function MyInfo() {
  const [userData, setUserData] = useState<IUserData[]>([]);

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/user?id=1");
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MyInfoContainer>
      <ul>
        {userData.map((value) => {
          return (
            <Profile list={value} key={value.id} getUserData={getUserData} />
          );
        })}
      </ul>
    </MyInfoContainer>
  );
}

export default MyInfo;
