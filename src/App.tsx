import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/footer/Footer.tsx';
import { Header } from '@/components/header/Header.tsx';
import { Toast } from '@/components/toast/Toast.tsx';

import { CategoriesProvider } from './contexts/сategories-сontext';

export function App(): JSX.Element {
  return (
    <CategoriesProvider>
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </CategoriesProvider>
  );
}
