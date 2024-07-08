import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Notifications from './components/Notifications';
import ChooseUser from './components/ChooseUser';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/choose-user' element={<ChooseUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
