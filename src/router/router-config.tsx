import { createRoutesFromElements, Route } from 'react-router-dom';

import { getCategories } from '@/api/client-actions';
import { App } from '@/App';
import { ActionPaths, NavigationPaths } from '@/common/enums';
import { NonAuthRoute } from '@/components/non-auth-route/NonAuthRoute';
import { About } from '@/pages/about/About';
import { Catalog } from '@/pages/catalog/Catalog';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { Home } from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import { NoMatch } from '@/pages/no-match/NoMatch';
import { Product } from '@/pages/product/Product';
import { Register } from '@/pages/register/Register';

// import { loadCategories, loadCategory, loadProduct, loadSubcategory } from './loaders';

export const routerConfig = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path={NavigationPaths.CATALOG} element={<Catalog />} loader={getCategories} />
      <Route path={`${NavigationPaths.CATALOG}/:categoryName`} element={<Catalog />} loader={getCategories} />
      <Route
        path={`${NavigationPaths.CATALOG}/:categoryName/:subcategoryName`}
        element={<Catalog />}
        loader={getCategories}
      />
      <Route
        path={`${NavigationPaths.CATALOG}/:categoryName/:subcategoryName/:productName`}
        element={<Product />}
        loader={getCategories}
      />
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
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Route>,
);
