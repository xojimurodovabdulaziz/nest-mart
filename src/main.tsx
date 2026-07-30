import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";
import { ProfileDrawerProvider } from "./context/ProfileDrawerContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ToastProvider } from "./components/Toast/ToastContext";
import "./index.css";
import "./styles/animations.css";
import "./styles/skeleton.css";
import "./styles/dark-theme.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider>
      <LanguageProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <ProfileDrawerProvider>
                <App />
              </ProfileDrawerProvider>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
      </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
