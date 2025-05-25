import { BrowserRouter } from "react-router";
import AppRouter from "./router/app-router";
import { ToastContainer } from "react-toastify";

export default function App() { 
  return ( 
    <BrowserRouter>
      <AppRouter/>
      <ToastContainer/>
    </BrowserRouter>
  )
}