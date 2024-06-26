import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Api } from "../apiConfig"

export default function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange = { (e) => {
            setUsername(e.target.value);   
        }
        } type = {"text"} placeholder="john@gmail.com" label={"Email"} />
        <InputBox onChange = { (e) => {
            setPassword(e.target.value);
        }}
         type = {"password"} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onPress={async ()=> {
                let response = await axios.post(Api+ "/user/signin", {
                    username,
                    password
                });
                console.log(response.data.token);
                if (response.data.token) {
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } else window.alert(response.data.message);
          }}
          label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}