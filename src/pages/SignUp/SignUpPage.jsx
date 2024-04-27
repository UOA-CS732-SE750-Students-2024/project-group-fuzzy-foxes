import React, { useState } from 'react';
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password:'',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password){
        setError("The passwords you entered twice do not match");
        return;
    }
    const {confirm_password,...dataToSubmit} = formData;
    console.log(dataToSubmit);
    setError('');
    // 这里可以加上发送数据到后端的代码
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            UserName:
            <input type="text" name="username" value={formData.username} onChange={handleChange}required/>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange}required/>
          </label>
        </div>
        <div>
            <label>
                Confirm your Password:
                <input type = "password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required/>
            </label>
        </div>
        {error && <p className='error'>{error}</p>}
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
