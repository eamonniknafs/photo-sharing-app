import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
  const { photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable } = usePhotos();

  library.add(fas)
  return (
    <Router>
      <Navigation props={{ profileData, token, removeProfileData, removeToken }} />
      <Routes>
        <Route path="/login" element={<Login props={{ setToken, fetchProfileData }} />} />
        <Route path="/register" element={<Register props={{ setToken, fetchProfileData }} />} />
        <Route path="/profile" element={<Profile profileData={profileData} gallery={{ photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable }} />} />
        <Route path="/" element={<Explore gallery={{ photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable }} />} />
        <Route path="/upload" element={<Uploads token={token} />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
export default App;