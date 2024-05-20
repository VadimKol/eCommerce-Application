import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/footer/Footer.tsx';
import { Header } from '@/components/header/Header.tsx';

import Toast from './components/toast/Toast.tsx';

export function App(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </>
  );
}
