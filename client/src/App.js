import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';

function App() {
  return (
    <div style={styles.app} >
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const styles = {
  app: {
    padding: 50,
    height: '100%'
  },
}

export default App;
