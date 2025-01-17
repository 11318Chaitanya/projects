import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
    const[credentials, setCredentials] = useState({name: "", email: "", password:"", cpassword:""});
    const navigate = useNavigate();

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        const {name, email, password, cpassword} = credentials;
        e.preventDefault();
        if(password === cpassword){
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}), 
              });
              const json = await response.json();
              if(json.success){
                //redirect
                localStorage.setItem("token", json.authtoken);
                props.showAlert("Account created successfully","success");
                navigate('/');
              }
              else{
                props.showAlert("Invalid Details","danger");
              }
        }
        else{
            props.showAlert("Passwords do not match","danger");
        }
    }
  
    return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
         <h2>Create account to use iNotebook</h2>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup