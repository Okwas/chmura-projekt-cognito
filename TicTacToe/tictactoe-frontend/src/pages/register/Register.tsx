import { register } from "@/api/cognito";
import { useAppStore } from "@/stores/app-store";
import { useRef } from "react";

export default function Register() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {setStage} = useAppStore();

    function onRegister() {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email || !password) {
        return;
      }
      console.log(email, password);
      register(email, password).then(() => {
        alert("User registered");
        setStage('register')
      });
    }
  
    function onLoginClick() {
      setStage('login')
    }
  
    return (
      <div>
        <p>Register</p>
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button onClick={() => onRegister()}>Register</button>
        <div>
          <button onClick={() => onLoginClick()}>Go to login</button>
        </div>
      </div>
    );
  }
