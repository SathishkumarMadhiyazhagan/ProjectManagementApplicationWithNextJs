// components/Toast.js

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message }) => {
  const notify = () => toast.success(message, { autoClose: 3000 });

  return (
    <div>
      <ToastContainer limit={1}>{notify()}</ToastContainer>
    </div>
  );
};

export default Toast;
