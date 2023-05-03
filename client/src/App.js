import NavBar from './NavBar/NavBar.jsx';
import './NavBar/NavBar.css'
import HomePage from './HomePage/HomePage.jsx';
import './HomePage/HomePage.css';
import './App.css'
import Footer from './Footer/Footer.jsx';
import './Footer/Footer.css'


function App() {
  return (
    <div className="App"><NavBar/>
 <HomePage/>
 <Footer/>
    </div>
  );
}

export default App;
