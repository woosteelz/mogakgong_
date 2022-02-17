import Signup from './accounts/Signup'
import Signin from './accounts/Signin'
import { Route, Routes } from 'react-router-dom';
import Main from './view/Main'
import VideoRoom from './components/VideoRoomComponent'
import UserProfile from './accounts/UserProfile'
import CreateStudyroom from './view/CreateStudyroom'
import BeforeEnterRoom from './view/BeforeEnterRoom'
import MyAppBar from './components/AppBar'
// import Community from './view/Community'
import Page404 from './components/Page404'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://i6c204.p.ssafy.io:8081/api"

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [studyrooms, setStudyroom] = useState([])
  const [rcmStudyrooms, setRcmStudyroom] = useState([])

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(BASE_URL + "/member", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setUserInfo(res.data.member)
      console.log('응답값 :', res.data.member)
      // console.log('userinfo:', userInfo)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchUserInfo();
    console.log(userInfo)
  }, [])

  return (
    <>
      <MyAppBar userInfo={userInfo} setUserInfo={setUserInfo} />
      <Routes>
        <Route path="/" element={
          <Main
            studyrooms={studyrooms}
            setStudyroom={setStudyroom}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            rcmStudyrooms={rcmStudyrooms}
            setRcmStudyroom={setRcmStudyroom}
          />} />
        <Route path="/login" element={
          <Signin
            studyrooms={studyrooms}
            setStudyroom={setStudyroom}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            rcmStudyrooms={rcmStudyrooms}
            setRcmStudyroom={setRcmStudyroom}
          />} />
        <Route path="/join" element={<Signup />} />
        <Route path="/studyroom" element={<VideoRoom />} />
        <Route path="/profile" element={<UserProfile userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path="/createroom" element={<CreateStudyroom userInfo={userInfo} />} />
        <Route path="/beforestudy" element={<BeforeEnterRoom />} />
        <Route path="/community" element={<Page404 />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  )
}

export default App;
