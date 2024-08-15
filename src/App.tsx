import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./page/Home";
import SearchMovies from "./page/Search";
import Profil from "./page/Profil";
import Header from "./components/header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}
