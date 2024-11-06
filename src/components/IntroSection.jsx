import React, { useEffect, useState } from 'react';
import '../styles/IntroSection.css';

// 이미지 import
import messageIcon from '../assets/8159097_letter_message_send_woman_mail_icon (2).png';

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className={`intro-section ${isVisible ? "visible" : ""}`}>
        <div className="intro-content">
          <div className="text-section">
            <h1 className="intro-title">Magic of Memories</h1>
            <h2 className="intro-subtitle">당신의 추억을 미래로 보내는 시간 여행</h2>
            
            <div className="text-with-image">
              <p>
                당신의 소중한 추억과 감정을 메시지 보틀에 담아
                <br />
                추후에 다시 열어볼 수 있는 사이트 입니다.
                <br />
                마치 바다를 떠도는 유리병 속 편지처럼
                <br />
                오늘의 생각과 마음을 미래의 자신에게 보내보세요.
              </p>
            </div>
          </div>

          <div className="model-container">
            {/* 이미지 경로를 import로 변경 */}
            <img src={messageIcon} alt="Message icon" />
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroSection;