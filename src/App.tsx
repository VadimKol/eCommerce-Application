import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/footer/Footer.tsx';
import { Header } from '@/components/header/Header.tsx';
import { Toast } from '@/components/toast/Toast.tsx';

import { AuthProvider } from './contexts/auth-context';
import { CartProvider } from './contexts/cart-context';
import { PromocodesProvider } from './contexts/promocodes-context';
import { CategoriesProvider } from './contexts/сategories-сontext';

export function App(): JSX.Element {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <CartProvider>
          <PromocodesProvider>
            <Header />
            <Outlet />
            <Footer />
            <Toast />
          </PromocodesProvider>
        </CartProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}
