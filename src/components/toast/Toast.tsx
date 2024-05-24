import { Flip, ToastContainer } from 'react-toastify';

export function Toast(): JSX.Element {
  return (
    <div className="Toast">
      <ToastContainer
        position="bottom-center"
        rtl={false}
        autoClose={3000}
        hideProgressBar={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        newestOnTop={false}
        closeOnClick
        limit={3}
      />
    </div>
  );
}
