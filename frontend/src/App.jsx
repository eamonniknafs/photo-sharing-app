import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


import { heart } from '@fortawesome/free-regular-svg-icons'
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
  usePhotos,
  useComments,
  useFriends,
  Friends
} from "./components";

function App() {
  const { token, removeToken, setToken } = useToken();
  const { profileData, removeProfileData, setProfileData, fetchProfileData } = useProfileData();
  const { photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable, setDataAvailable } = usePhotos();
  const { comments, setComments, addComment, fetchComments, likes, setLikes, newLike, removeLike, fetchLikes, isLiked, liked, setLiked } = useComments();
  const { users, getUsers, friends, getFriends, addRemoveFriend } = useFriends();

  library.add(fas)
  library.add(far)

  return (
    <Router>
      <Navigation props={{ profileData, token, removeProfileData, removeToken }} />
      <Routes>
        <Route path="/login" element={<Login props={{ setToken, fetchProfileData }} />} />
        <Route path="/register" element={<Register props={{ setToken, fetchProfileData }} />} />
        <Route path="/profile" element={<Profile profileData={{ profileData, token }} gallery={{ photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable, setDataAvailable }} comments={{ comments, setComments, addComment, fetchComments, likes, setLikes, removeLike, fetchLikes, isLiked, liked, setLiked, newLike }} />} />
        <Route path="/" element={<Explore gallery={{ photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable, setDataAvailable }} comments={{ comments, setComments, addComment, fetchComments, likes, setLikes, removeLike, fetchLikes, isLiked, liked, setLiked, newLike }} profileData={{ profileData, token }} />} />
        <Route path="/upload" element={<Uploads token={token} />} />
        <Route path="/friends" element={<Friends profileData={{ profileData, token }} gallery={{ photos, setPhotos, addPhotos, fetchPhotos, loading, dataAvailable, setDataAvailable }} comments={{ comments, setComments, addComment, fetchComments, likes, setLikes, removeLike, fetchLikes, isLiked, liked, setLiked, newLike }} friends={{ users, getUsers, friends, getFriends, addRemoveFriend }} />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
export default App;