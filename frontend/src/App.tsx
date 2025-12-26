import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Read from "./pages/Read";
import Write from "./pages/Write";
import Auth from "./pages/Auth";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route index element={<Home/>} />
          <Route element={<UnauthenticatedLayout />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/write" element={<Write />} />
          </Route>
          <Route path="/read/:id" element={<Read/>} />
        </Route>
      </Routes>
    </>
  );
}

