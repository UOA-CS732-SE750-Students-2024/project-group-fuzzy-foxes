import React, { useState } from 'react';
import RegisterForm from './SignUp/RegisterForm';
import Modal from './SignUp/modal';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRegister = (formData) => {
    console.log('Register', formData);
    setModalOpen(false);
  };

  return (
    <div className="app">
      <button onClick={() => setModalOpen(true)}>Sign Up</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <RegisterForm onSubmit={handleRegister} />
      </Modal>
    </div>
  );
}

export default App;
