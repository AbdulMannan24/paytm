import { BrowserRouter, Routes, Route} from 'react-router-dom'
import SingUp from './pages/SingUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import Home from './pages/Home'

function App() {

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
