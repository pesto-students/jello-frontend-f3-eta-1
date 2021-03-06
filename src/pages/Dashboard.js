import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSelector, useDispatch } from 'react-redux';
import { getBoards } from '../actions/board';
import { loadUser } from '../actions/auth';
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import Navbar from '../components/other/Navbar';
import CreateBoard from '../components/other/CreateBoard';
import CircularProgress from '@material-ui/core/CircularProgress';


const Dashboard = () => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { user, authIsReady, authDispatch } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading); 
  
  useEffect(() => {
    dispatch(getBoards());
  },[]);
  
  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
      <section className='dashboard'>
        <h1>Welcome {user && user.email}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className='dashboard-loading' />}
        <div className='boards'>
          { boards && boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
              {board.title}
            </Link>
          ))}
        <CreateBoard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


