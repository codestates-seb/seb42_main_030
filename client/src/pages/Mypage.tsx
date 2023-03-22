import MypageMain from "../components/Mypage/MypageMain";
// import { ImageData } from "../App";

interface ImageDataProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  userData: any;
  getUserData: any;
}

function Mypage({ image, setImage, userData, getUserData }: ImageDataProps) {
  return (
    <div>
      <MypageMain
        image={image}
        setImage={setImage}
        userData={userData}
        getUserData={getUserData}
      />
    </div>
  );
}

export default Mypage;
