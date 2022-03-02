import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import View from "../pages/view/View";
export default function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}
