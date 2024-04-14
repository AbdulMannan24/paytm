import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Appbar({name}){
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.setItem("token", "");
        navigate('/signin');
    }
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <button onClick= {handleLogout}>
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>
        </div>
    </div>
}