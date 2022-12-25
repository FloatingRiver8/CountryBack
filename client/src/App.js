import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import LandingPage from './components/LandingPage';
import Home from './components/Home'
import Form from './components/Form'
import DetailCard from './components/DetailCard'

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <h1>Esto es app.js</h1>
      <Route exact path= '/' component={ LandingPage }></Route>
    <Route exact path= '/home' component={ Home }></Route>
    <Route exact path='/form' component={ Form }></Route>
    <Route exact path='/country/:id' component={ DetailCard }></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
