import { useEffect, useState } from 'react'
import  Appbar  from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
import { Api } from '../apiConfig'

export default function Dashboard() {
    const [balance, setBalance] = useState(0);

    async function fetchBalance() {
        let token ='Bearer '+ localStorage.getItem("token");
        let response = await axios.get(Api + "/account/balance", {
            headers: { 'authorization': token },
        });
        if (response.data.balance) setBalance(response.data.balance);
        if (response.data.message) setBalance("-1");
        return response;
    }
    useEffect( ()=> {
        fetchBalance();   
    }, [])
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    )
}