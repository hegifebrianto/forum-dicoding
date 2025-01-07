import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderBoardsPage';
import DetailPage from './pages/DetailPage';

function App() {
  const { isPreload = false, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }
  if (authUser === null) {
    return (
      <>
        <Loading />
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
      </>
    );
  }

  return (
    <>
      <Loading />
      <Navigation authUser={authUser} signOut={onSignOut} />
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<AddThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/thread/:threadId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
