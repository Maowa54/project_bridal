import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./IndexComponent/App";
import { CartProvider } from "./Component/Frontend/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <CartProvider>
      <App />
    </CartProvider>
    
  </>
);
