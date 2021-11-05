import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './componentes/Landing/Landing.jsx';
import DogsHome from './componentes/DogsHome/DogsHome.jsx';
import NewDog from './componentes/NewDog/NewDog.jsx';
import DogsDetails from './componentes/DogsDetails/DogsDetails.jsx';




function App() {
  return (
    <BrowserRouter> 
   <div className="App">  
     <Route exact path='/' component={Landing}/>
     <Route path ='/dogs/:id'  render ={({match}) => <DogsDetails id = {match.params.id}/>}/>
     <Route exact path='/dogs' component={DogsHome}/>
     <Route path ='/newDog' component={NewDog}/>
    </div>
    </BrowserRouter>
  );
};

export default App;