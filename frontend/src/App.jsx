import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  // Footer,
  Login,
  Register,
  Profile,
  Explore,
  Uploads,
  useToken,
  useProfileData,
  usePhotos
} from "./components";

function App() {
  const { token, removeToken, setToken } = useToken();
  const { profileData, removeProfileData, setProfileData, fetchProfileData } = useProfileData();
  const { photos, setPhotos, addPhotos } = usePhotos();

  return (
    <Router>
      <Navigation props={{ profileData, token, removeProfileData, removeToken}} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} fetchProfileData={fetchProfileData }  />} />
        <Route path="/register" element={<Register setToken={setToken} fetchProfileData={fetchProfileData} />} />
        <Route path="/profile" element={<Profile profileData={profileData} />} />
        <Route path="/" element={<Explore photos={photos} setPhotos={setPhotos} addPhotos={addPhotos} />} />
        <Route path="/upload" element={<Uploads token={token } />}/>
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
export default App;