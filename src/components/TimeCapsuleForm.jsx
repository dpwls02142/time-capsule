import React, { useState, useRef, useEffect } from 'react';
import '../styles/TimeCapsuleForm.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import Alert from './Alert';

function TimeCapsuleForm({ addCapsule }) {

  // form 필드 상태 관리 useState
  const [title, setTitle] = useState('');
  const [openDate, setOpenDate] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [value, setValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const calendarRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!title) missingFields.push('제목');
    if (!openDate) missingFields.push('날짜');
    if (!message) missingFields.push('내용');

    if (missingFields.length > 0) {
      setAlertMessage(`제목과 날짜, 내용은 무조건 입력 해야돼요.
        아직 ${missingFields.join(', ')}을(를) 입력 하지 않았어요.`);
      setShowAlert(true);
      return;
    }

    // 새로운 캡슐 객체 생성
    const capsule = {
      title,
      openDate: openDate.toISOString(), // 열람 날짜를 ISO 형식으로 변환
      message,
      createDate: new Date().toISOString(), // 로컬 날짜 == create date로 설정
      image,
      imageName
    };

    addCapsule(capsule);
    resetForm();
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setTitle('');
    setOpenDate(null);
    setMessage('');
    setImage(null);
    setImageName('');
    fileInputRef.current.value = '';
  };

  // 캘린더 날짜 선택 시 호출되는 함수
  const handleDateChange = (date) => {
    setOpenDate(date);
    setValue(date);
    setShowCalendar(false);
  };

  // 파일 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 이미지를 base64 형식으로 설정
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImageName('');
    }
  };

  // 이미지 삭제
  const handleImageRemove = () => {
    setImage(null);
    setImageName('');
    fileInputRef.current.value = '';
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // 붙여넣기를 이미지 처리
  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setImageName(file.name);
        };
        reader.readAsDataURL(file);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);

    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('paste', handlePaste);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tileDisabled = ({ date }) => {
    return date < new Date();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="capsule-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          placeholder="제목을 입력해주세요..." />

        <div className="button-group">
          <button type="button" onClick={toggleCalendar} className="calendar-toggle-button">
            <i className="fas fa-calendar-alt"></i>
            {openDate ? openDate.toLocaleDateString() : '날짜'}
          </button>

          {showCalendar && (
            <div className="calendar-popup" ref={calendarRef}>
              <Calendar
                onChange={handleDateChange}
                value={value}
                formatDay={(locale, date) => moment(date).format("DD")}
                tileDisabled={tileDisabled} />
            </div>
          )}

          <div className="image-upload-container">
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }} />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="upload-button"
            >
              <i className="fas fa-image"></i>
              이미지
            </button>
            {image && (
              <div className="selected-image">
                <span>{imageName}</span>
                <button type="button" onClick={handleImageRemove} className="remove-image">
                  X
                </button>
              </div>
            )}
          </div>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-textarea"
          placeholder="미래의 나에게 해주고 싶은 말을 자유롭게 적어보세요..."
        ></textarea>

        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            추억 기록하기
          </button>
        </div>
      </form>
      <Alert
        message={alertMessage}
        isVisible={showAlert}
        onClose={() => setShowAlert(false)} />
    </>
  );
}

export default TimeCapsuleForm;