import { useState, useEffect } from 'react';
import TimeCapsuleForm from './components/TimeCapsuleForm.jsx';
import CapsuleList from './components/CapsuleList.jsx';
import NavBar from './components/NavBar.jsx';
import Wave from './components/Wave.jsx';
import IntroSection from './components/IntroSection.jsx';
import './styles/App.css';
import { Helmet } from 'react-helmet-async';

const App = () => {
  const [capsules, setCapsules] = useState([]);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 캡슐을 불러옴
  useEffect(() => {
    const savedCapsules = JSON.parse(localStorage.getItem('capsules')) || [];
    setCapsules(savedCapsules);
  }, []);

  const addCapsule = (capsule) => {
    const newCapsules = [...capsules, capsule];
    setCapsules(newCapsules);
    localStorage.setItem('capsules', JSON.stringify(newCapsules));
  };

  const deleteCapsule = (newCapsules) => {
    setCapsules(newCapsules);
    localStorage.setItem('capsules', JSON.stringify(newCapsules));
  };  

  const openCapsule = (capsule) => {
    alert(capsule.message);
  };

  return (
    <>
      <Helmet prioritizeSeoTags>
          <title>Message Bottle</title>
          <meta property="og:title" content="Message Bottle"/>
          <meta property="og:url" content="https://dpwls02142.github.io/time-capsule/" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="당신의 소중한 추억과 감정을 메시지 보틀에 담아
                                                  추후에 다시 열어볼 수 있는 사이트 입니다.
                                                  마치 바다를 떠도는 유리병 속 편지처럼
                                                  오늘의 생각과 마음을 미래의 자신에게 보내보세요." />
          <meta property="og:image" content="./src/assets/message_bottle.jpg"/>
      </Helmet>
      <div className='nav-bar'>
        <NavBar />
      <Wave />
      </div>
      <IntroSection />
      {/* 캡슐 추가 (==추억 기록하기) */}
      <section id="form">
        <TimeCapsuleForm 
          addCapsule={addCapsule}
        />
      </section>
      {/* 캡슐 리스트 */}
      <section id="list">
        <CapsuleList
          capsules={capsules}
          openCapsule={openCapsule}
          deleteCapsule={deleteCapsule}
        />
      </section>
    </>
  );
};

export default App;