import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";
import SignIn from "./SignIn";

export default function Home() {


    return (
        <div className="bg-slate-900 h-screen">
            <div className="shadow h-14 flex justify-between">
                <div className="flex flex-col justify-center h-full ml-4 text-2xl font-bold text-white">
                    PayTM 
                </div>
                <div className="flex">
                    {/* <div className="flex flex-col justify-center h-full mr-4 font-semibold">
                        <Link to="/signin"> Login </Link>
                    </div> */}
                    <div className="flex flex-col justify-center h-full mr-4 font-semibold text-white">
                        <Link to="/signup"> SignUp </Link>
                    </div> 
                </div>
            </div>
            <SignIn/>


        </div>
    )
}