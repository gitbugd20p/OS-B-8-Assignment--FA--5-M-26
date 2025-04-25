import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Css for this Project
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./assets/css/main.css";
import "./assets/css/animate.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// skeleton and skeleton css
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
