import { styled } from '@mui/material';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
// import ProtectedRoute from './components/ProtectedRoute';
// import PublicRoute from './components/PublicRoute';
// import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  


  //styling starts here
  
  const CustomApp = styled('div')(({ theme }) => ({
    backgroundColor: "#031B34",
    color: "white",
    minHeight: "100vh",
  }))
  
  //styling ends here




  return (
    <BrowserRouter>
      <CustomApp>
        <Header />
        {/* your private and public routes goes here */}

        <PublicRoute path="/login" component={LoginPage}></PublicRoute>
        <PublicRoute path='/register' component={Register}></PublicRoute>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/coins/:id" component={CoinPage} />   
      </CustomApp>
    </BrowserRouter>
  );
}

export default App;
