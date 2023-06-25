import {
  useState,
} from 'react';

const useInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  }

  return { 
    showPassword,
    togglePassword,
  }
}

export default useInput;