import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f4f4f9;
  min-height: 30vh;
  max-width: 30vh;
  margin: 100px auto;
  border-radius: 20px;
`;

const InputFieldWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 8px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;

  label {
    font-weight: bold;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const InputFieldWithButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 8px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  input[type="file"] {
    display: none;
  }

  label {
    padding: 12px 16px;
    font-size: 1em;
    border: none;
    background-color: #86acd9;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  span {
    flex: 1;
    padding: 12px;
    font-size: 1em;
    color: #333;
  }

  label:hover {
    background-color: #649bbd;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 24px;
  width: 100%;
  max-width: 400px;
  height: 42px;
  background: #000000;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #333333;
  }
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { isAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  // const handleFileChange = (e) => {
  //   setFileName(e.target.files[0]?.name || "선택한 파일 없음");
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.error("서버에서 유저 정보를 못 받아왔습니다요 이유는 =>", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUserInfo((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        }));
        setUser((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
          avatar: response.data.avatar,
        }));
        alert("프로필이 업데이트되었습니다.");
        setNewNickname("");
        setSelectedFile(null);
        setFileName("");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <form onSubmit={handleProfileUpdate}>
        <InputFieldWithLabel>
          <label>변경할 닉네임</label>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </InputFieldWithLabel>
        <InputFieldWithLabel>
          <label>변경할 프로필 사진 선택</label>
          <InputFieldWithButton>
            <label htmlFor="file-upload">파일 선택</label>
            <span>{fileName}</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
          </InputFieldWithButton>
        </InputFieldWithLabel>
        <Button type="submit">프로필 업데이트 하기</Button>
      </form>
    </Container>
  );
};

export default MyPage;
