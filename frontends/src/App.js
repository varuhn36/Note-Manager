import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNotes from './Screens/MyNotes/MyNotes';
import LoginPage from './Screens/LoginPage/LoginPage';
import RegisterPage from './Screens/RegisterPage/RegisterPage';
import CreateNote from './Screens/CreateNote/CreateNote';
import SingleNote from './Screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfilePage from './Screens/ProfilePage/ProfilePage';

function App() {

  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact/>
          <Route path="/login" element={<LoginPage />} exact/>
          <Route path="/register" element={<RegisterPage />} exact/>
          <Route path="/profile" element={<ProfilePage />} exact/>
          <Route path="/mynotes/createnote" element={<CreateNote />} exact/>
          <Route path="/mynotes" element={<MyNotes  search={search}/>} exact/>
          <Route path="/note/:id" element={<SingleNote />} exact/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
