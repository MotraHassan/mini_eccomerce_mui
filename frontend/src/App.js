import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/details/Product";
 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="cart" element={<Cart/>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
