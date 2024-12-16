import React, { useState, useEffect } from 'react';
import TimeCapsuleForm from './components/TimeCapsuleForm.jsx';
import CapsuleList from './components/CapsuleList.jsx';
import NavBar from './components/NavBar.jsx';
import Wave from './components/Wave.jsx';
import IntroSection from './components/IntroSection.jsx';
import './styles/App.css';

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