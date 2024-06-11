import styled from 'styled-components';
import { useState } from 'react';

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
  const [fileName, setFileName] = useState("선택한 파일 없음");

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name || "선택한 파일 없음");
  };

  return (
    <Container>
      <InputFieldWithLabel>
        <label>변경할 닉네임</label>
        <input type="text" />
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
      <Button>프로필 업데이트 하기</Button>
    </Container>
  );
};

export default MyPage;
