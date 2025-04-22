import React from 'react'
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import About from './pages/About';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Route,Routes} from 'react-router-dom';
import Register from './pages/Register';
import Categories from './pages/Categories';
import CatLessons from './pages/CatLessons';
import Ai from "./pages/Ai";
import PrivateRoute from "./components/PrivateRoute";
import HospitalList from "./pages/HospitalList";
import VideoGallery from "./pages/VideoGallery";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
        <Route
          path="/lessons/:lessonID"
          element={
            <PrivateRoute>
              <Lessons />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <Ai />
            </PrivateRoute>
          }
        />
        <Route path="/hospitalList" element={<HospitalList />} />
        <Route path="/videoGallery" element={<VideoGallery />} />
        <Route
          path="/categories/:categoryID"
          element={
            <PrivateRoute>
              <CatLessons />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App
