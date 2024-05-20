import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import { useAuth } from '@/hooks/useAuth.ts';
import { Footer } from '@/components/footer/Footer.tsx';
import { Header } from '@/components/header/Header.tsx';

export function App(): JSX.Element {
  /*   const { handleLogin } = useAuth();

  if (sessionStorage.getItem('geek-shop-token') !== null) {
    // будет ли такой код вызывать каждый раз 2 рендер, нужно 1 раз залогинить, при входе в магазин, если токен в storage
    handleLogin();
  } */

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}
