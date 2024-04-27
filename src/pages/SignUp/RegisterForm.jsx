
import React, { useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendFormDataToServer = (data) => {
    fetch('API URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      onSubmit(); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert('The password you entered twice do not match！');
        return;
    }
    const { confirmPassword, ...dataToSubmit } = formData;
        console.log(dataToSubmit)
        //sendFormDataToServer(dataToSubmit);
  };
    // 这里可以加上发送数据到后端的代码
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Own Account!</h2>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
      <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required/>
      <input type="password" name="confirmPassword" placeholder="confirm password" value={formData.confirmPassword} onChange={handleChange} required/>
      <button type="submit">SUBMIT</button>
    </form>
    
  );
}

export default RegisterForm;
