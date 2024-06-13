import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";
import Login from "./pages/LoginPage";
import { jsonApi } from "../api";
import { useQuery } from '@tanstack/react-query';

function App() {
  // R : useQuery, CUD : useMutation => 쿼리키가 따로 없음
  const { data: expenses, error, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data } = await jsonApi.get('/expenses');
      return data;
    },
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
