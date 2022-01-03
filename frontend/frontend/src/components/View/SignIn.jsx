import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const SignIn = () => {
    const [ setToken] = useContext(UserContext)
    // const [error, setError] = useState("")
    const [password, setPassword] = useState({ email: '', password: '' })
    // const [emailError, setEmailError] = useState({
    //     emailError: false
    // })
    const history = useHistory();

    const handleEmailError = (name, value) => {
        // if (name === 'email') {
        //     setEmailError({
        //         emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        //     })
        // }
    }

    const hanldeOnChange = (e) => {
        let { name, value } = e.target;
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (isPassValid) {
            const newPass = { ...password };
            newPass[name] = value
            setPassword(newPass)
        }
    }

    const hanldeOnSubmit = async(e) => {
        console.log(password)
        e.preventDefault()

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
              `grant_type=&username=${password.email}&password=${password.password}&scope=&client_id=&client_secret=`
            ),
          };
        const response = await fetch("/api/token", requestOptions);
        const data = await response.json();
        if(!response.ok){
            console.log("error happend")
            // setError(data.detail)
           
            
        }
        else {
            history.push('/api')
            console.log(data)
            setToken(data.access_token)
        }
    }
    return (
        <>
            <div title="Signup Form LoginValidation mt-5" />
            <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                    <div className="card bg-light">
                        <article
                            className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            <h4 className="card-title mt-3 text-center">
                                Create Account
                            </h4>

                            <form action="" onSubmit={hanldeOnSubmit}>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FaEnvelope />
                                        </span>
                                    </div>
                                    <input onChange={(e) => hanldeOnChange(e)} name="email" className="form-control" placeholder="Email address" type="email"
                                    />
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>
                                    </div>
                                    <input onChange={(e) => hanldeOnChange(e)} className="form-control" placeholder="Create password" type='password' name="password" />

                                </div>


                                <div className="form-group">
                                    <button type="submit"
                                        className="btn btn-primary btn-block mt-2"

                                        disabled={
                                            password.email && password.password ? false : true
                                        }
                                    >
                                        Login
                                    </button>
                                </div>

                            </form>
                        </article>
                    </div>
                    <h3>want to
                        <Link to="/">
                            <span style={{ color: "blue", cursor: "pointer" }} >Register</span>

                        </Link>
                    </h3>


                </div>
            </div>

        </>
    )
}

export default SignIn
