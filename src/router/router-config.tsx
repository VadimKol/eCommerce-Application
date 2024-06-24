import { createRoutesFromElements, Route } from 'react-router-dom';

import { App } from '@/App';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { AuthRoute } from '@/components/auth-route/AuthRoute';
import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';
import { About } from '@/pages/about/About';
import { Cart } from '@/pages/cart/Cart';
import { Catalog } from '@/pages/catalog/Catalog';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { Home } from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import { NoMatch } from '@/pages/no-match/NoMatch';
import { Product } from '@/pages/product/Product';
import { Profile } from '@/pages/profile/Profile';
import { Register } from '@/pages/register/Register';

export const routerConfig = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path={NavigationPaths.CATALOG} element={<Catalog />} />
      <Route path={`${NavigationPaths.CATALOG}/:categoryName`} element={<Catalog />} />
      <Route path={`${NavigationPaths.CATALOG}/:categoryName/:subcategoryName`} element={<Catalog />} />
      <Route path={`${NavigationPaths.CATALOG}/:categoryName/:subcategoryName/:productName`} element={<Product />} />
      <Route path={NavigationPaths.ABOUT} element={<About />} />
      <Route
        path={ActionPaths.LOGIN}
        element={
          <NonAuthRoute>
            <Login />
          </NonAuthRoute>
        }
      />
      <Route
        path={ActionPaths.REGISTER}
        element={
          <NonAuthRoute>
            <Register />
          </NonAuthRoute>
        }
      />
      <Route
        path={ActionPaths.PROFILE}
        element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        }
      />
      <Route path={ActionPaths.CART} element={<Cart />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Route>,
);
