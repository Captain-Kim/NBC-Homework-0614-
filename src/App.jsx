import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import Login from "./pages/LoginPage";
import { jsonApi } from "../api";
import { useQuery } from '@tanstack/react-query';

function App() {
  // const [expenses, setExpenses] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchExpenses = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await jsonApi.get('/expenses');
  //       setExpenses(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchExpenses();
  // }, []);

  // R : useQuery, CUD : useMutation => 쿼리키가 따로 없음
  const { data: expenses, error, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await jsonApi.get('/expenses');
      return data;
    },
    // staleTime 기본값 0 -> 서버에서 방금 받아온 정보도 수정이 일어났을 수 있으니
    // fresh하다고 보장할 수 없다. (stale하다)
    // infinity하다고 하는 것은 fresh를 보장하는 것.
    // 나 말고 어차피 아무도 건드릴 일이 없는 정보는 fresh하다고 보고 트래픽 낭비를 줄일 수 있음.
    staleTime: Infinity
  });

  if (isLoading) return <div>로딩중입니다</div>;
  if (error) return <div>에러 발생 : {error.massage}</div>;
  console.log('json 서버에서 불러온 데이터입니다요 =>', expenses);

  const PrivateRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const PublicRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? element : <Navigate to="/mypage" />;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute element={<Home expenses={expenses}/>} />}
            />
            <Route
              path="/detail/:id"
              element={<PrivateRoute element={<Detail expenses={expenses}/>} />}
            />
            <Route path="/login"
              element={<PublicRoute element={<Login />} />} />
            <Route path="/mypage"
              element={<PrivateRoute element={<MyPage />} />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
