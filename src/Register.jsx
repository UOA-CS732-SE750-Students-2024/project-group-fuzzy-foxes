import React, {useState} from 'react';
function Register(){
    const [formData, setFormData] = useState(
        {
            username:"",
            email:"",
            password:"",
        }
    );

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();//Add the logic that can be sent to the server into here
        console.log(FormData);
    };
    return (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
}
export default Register;