import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { jsonApi } from "../../api";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function Detail({ expenses, setExpenses }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedExpense = expenses.find((element) => element.id === id);

  const [date, setDate] = useState(selectedExpense.date);
  const [item, setItem] = useState(selectedExpense.item);
  const [amount, setAmount] = useState(selectedExpense.amount);
  const [description, setDescription] = useState(selectedExpense.description);

  const today = new Date();
  const month = today.getMonth() + 1; // 현재 월 가져오기
  const [newDate, setNewDate] = useState(
    `2024-${String(month).padStart(2, "0")}-01`
  );
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const editExpense = async (id) => {
    try {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(date)) {
        alert('날짜를 YYYY-MM-DD 형식으로 입력해주세요.');
        return;
      }
      if (!item || amount <= 0) {
        alert("유효한 항목과 금액을 입력해주세요.");
        return;
      }

      const updatedExpense = {
        ...selectedExpense, // 원래의 모든 필드를 유지
        date: date,
        item: item,
        amount: amount,
        description: description,
      };

      await jsonApi.put(`/expenses/${id}`, updatedExpense);
      setExpenses(expenses.map(expense => (expense.id === id ? updatedExpense : expense)));
      // ??? 상태 변경이 왜 필요한가? 홈으로 나가면 GET 요청을 다시 보내서 새롭게 데이터를
      // 받아와 상태가 변경되어 리렌더링까지 잘 되는데 이 과정이 필요한 이유는?
      // 일단 없애도 작동 잘 함.
      // ??? 성능 최적화를 하기 위함인가? 서버에서 홈으로 나갈 때마다 상태 변경없이 같은 내용인데
      // GET 요청을 계속 보내서 새로 받아오면 비효율인 것 같은데,
      // 상태가 같으면 fetch에서 응답하는 내용이 없도록 할 수 있는 것인가? 이게 쿠키인가 그거?
      // ??? 이렇게 상태를 바꿔서 리렌더링 시켰는데 서버에서 뭔가 반영이 잘 안 되어서 클라이언트와 서버의 자료가 달라지면 어떻게 되는가?
      alert(`${item} 항목을 수정하였습니다.`);

      // 초기화
      const month = today.getMonth() + 1; // 현재 월 가져오기
      setNewDate(`2024-${String(month).padStart(2, "0")}-01`);
      setNewItem("");
      setNewAmount("");
      setNewDescription("");

    } catch (error) {
      alert('수정 과정에서 에러가 발생했습니다 : ' + error.message);
    }
  };


  const deleteExpense = async (id) => {
    try {
      await jsonApi.delete(`/expenses/${id}`);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
      alert(`${description} 항목을 삭제하였습니다.`);
      navigate('/');
    } catch (error) {
      alert('삭제 과정에서 에러가 발생했습니다 : ' + error.message);
    }
  };

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => editExpense(id)}>수정</Button>
        <Button danger="true" onClick={() => deleteExpense(id)}>
          삭제
        </Button>
        <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  );
}
