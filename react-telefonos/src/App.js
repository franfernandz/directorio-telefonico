import React from 'react'
import './App.css'
import SearchComponent from './components/SearchComponent'
import HeaderDir from './components/HeaderDir'
import FooterDir from './components/FooterDir'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//paginas importadas
import AdminLogin from './components/AdminLogin'



function App() {
  return (
    <React.Fragment>
      {/* Rutas */}
      <Router>
        <Routes>
          <Route exact path="/components/AdminLogin" element={<AdminLogin />} />
        </Routes>
      </Router>
      {/* Contenido principal */}
      <div className="container-fluid">
        <HeaderDir/>      
        <SearchComponent />
        <FooterDir />      
      </div>      
    </React.Fragment>
    
  );
}

export default App;
