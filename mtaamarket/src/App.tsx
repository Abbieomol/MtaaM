import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Customer from './pages/Customer';
import Notifications from './pages/Notifications';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Vendor from './pages/Vendor';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vendor" element={<Vendor />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;