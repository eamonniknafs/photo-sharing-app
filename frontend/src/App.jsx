import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  // Footer,
  Login,
  Register,
  Profile,
  Explore,
  useToken,
  useProfileData
} from "./components";

function App() {
  const { token, removeToken, setToken } = useToken();
  const { profileData, removeProfileData, setProfileData, updateProfileData } = useProfileData();

  return (
    <Router>
      <Navigation profileData={profileData} token={token} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} updateProfileData={ updateProfileData }  />} />
        <Route path="/register" element={<Register setToken={setToken} updateProfileData={updateProfileData} />} />
        <Route path="/profile" element={<Profile profileData={profileData} />} />
        <Route path="/" element={<Explore />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
export default App;