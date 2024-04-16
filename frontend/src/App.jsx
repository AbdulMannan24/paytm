import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import SingUp from './pages/SingUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0);
    
  useEffect(()=> {
    window.alert("for Testing,can also use Email: 'testing@gmail.com' & password: 'testing' , first Api request might take 50seconds to activate Free Instance,Thank you");
  },[count])

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element = {< Home />} />
            <Route path= '/signup' element= { <SingUp />}/>
            {/* <Route path= '/signin' element= { <SignIn />} /> */}
            <Route path= '/dashboard' element= { <Dashboard />} />
            <Route path = '/send' element= { <SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
