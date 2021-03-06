import "./../App.css";
import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(event) {
        console.log("loginUser");
        // event.preventDefault();
        const response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const status = await response.status;
        console.log(status);
        switch (status) {
            case 200:
                const data = await response.json();
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userID", data.id);
                window.location.href = "/home";
                break;
            case 401:
                alert("Username or password is incorrect");
                break;
            default:
                alert("Something went wrong");
                break;
        }
    }

    function changeName(e) {
        setUsername(e.target.value);
    }
    return (
        <div className="App2 center">
            <div className="card2 center">
                <h1>Login</h1>
                <div className="login center2">
                    <div className="login_with_cred center">
                        <input
                            className="login_shape"
                            name="username"
                            value={username}
                            onChange={changeName}
                            type="text"
                            placeholder="Username"
                        />
                        <input
                            className="login_shape"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button className="login_shape" onClick={loginUser}>
                            Login
                        </button>
                        <pre className="linear">
                            Don't have an account?{" "}
                            <a href="/register">Register now</a>
                        </pre>
                    </div>
                </div>
                <div className="center">
                    <pre className="linear ">
                        By continuing, you agree to our{" "}
                        <a href="/terms">Terms of Service</a> and{" "}
                        <a href="/privacy">Privacy Policy</a>.
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default Login;
