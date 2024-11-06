import React, { useState, useCallback } from 'react';
import '../styles/CapsuleList.css';
import CapsulePopup from './CapsulePopup';
import Alert from './Alert';

const CapsuleList = ({ capsules, deleteCapsule }) => {
  // 삭제 시 선택된 캡슐의 인덱스
  const [selectedCapsules, setSelectedCapsules] = useState([]);

  // 삭제 시 선택 모드 여부
  const [isSelecting, setIsSelecting] = useState(false);

  // 삭제 시 선택된 캡슐 객체를 저장 (팝업을 띄우기 위한 용도)
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  // 알림 메시지와 표시 여부
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // 삭제 시 대기 상태 여부
  const [pendingDelete, setPendingDelete] = useState(false);

   // 삭제 시 캡슐 선택 또는 선택 해제를 처리(선택된 캡슐의 인덱스 목록을 업데이트)
  const toggleSelectCapsule = useCallback((index) => {
    setSelectedCapsules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  // 삭제 시 전체 선택/해제를 처리
  const toggleSelectAll = useCallback(() => {
    setSelectedCapsules((prev) =>
      prev.length === capsules.length ? [] : capsules.map((_, index) => index)
    );
  }, [capsules]);

  // 선택된 캡슐 삭제 (삭제 전 알림 메시지 표시)
  const handleDeleteSelected = useCallback(() => {
    setAlertMessage(`정말 ${selectedCapsules.length}개의 추억을 삭제하시겠어요?`);
    setShowAlert(true);
    setPendingDelete(true);
  }, [selectedCapsules.length]);

  // 알림 팝업 닫기 및 삭제 확정 여부를 처리
  const handleAlertClose = useCallback((confirmed = false) => {
     // 삭제 alert 뜬 상태에서 확인을 눌렀을 때만 삭제 처리
    if (pendingDelete && confirmed) {
      const newCapsules = capsules.filter((_, index) => !selectedCapsules.includes(index));
      deleteCapsule(newCapsules);
      setSelectedCapsules([]);
      setIsSelecting(false);
    }
    setShowAlert(false);
    setPendingDelete(false);
  }, [pendingDelete, selectedCapsules, capsules, deleteCapsule]);

  // 아직 Open 일자가 지나지 않았으면 Alert
  const handleOpenCapsule = useCallback((capsule) => {
    const currentDate = new Date();
    const openDate = new Date(capsule.openDate);

    if (currentDate >= openDate) {
      setSelectedCapsule(capsule);
    } else {
      const daysRemaining = Math.ceil((openDate - currentDate) / (1000 * 60 * 60 * 24));
      setAlertMessage(`아직 추억을 열 수 있는 날까지 ${daysRemaining}일 남았어요.`);
      setShowAlert(true);
    }
  }, []);

  // 캡슐 목록이 비어있을 때 (== 캡슐이 0개 일 때)
  if (capsules.length === 0) {
    return (
      <div className="capsule-container">
        <div className="empty-list">Empty List</div>
        <div className="empty-subtext">아직 추억을 추가하지 않았어요</div>
      </div>
    );
  }

  return (
    <div className="capsule-container">
      <div className="header">
        {isSelecting ? (
          <>
            <button className="confirm-delete" onClick={handleDeleteSelected}>
              Confirm Delete ({selectedCapsules.length})
            </button>
            <button className="cancel-select" onClick={() => {
              setIsSelecting(false);
              setSelectedCapsules([]);
            }}>
              Cancel
            </button>
            <label className='select-text'>
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedCapsules.length === capsules.length}
              />
              Select All
            </label>
          </>
        ) : (
          <button className='delete-selected' onClick={() => setIsSelecting(true)}>
            Delete Capsules
          </button>
        )}
      </div>

      <ul className="capsule-list">
        {capsules.map((capsule, index) => {
          const openDate = new Date(capsule.openDate);
          const currentDate = new Date();
          const daysRemaining = Math.ceil((openDate - currentDate) / (1000 * 60 * 60 * 24));
          const isOpenable = daysRemaining <= 0;

          return (
            <li
              key={index}
              className={`capsule-item ${isSelecting ? 'selecting' : ''}`}
            >
              {isSelecting && (
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCapsules.includes(index)}
                    onChange={() => toggleSelectCapsule(index)}
                    className="visible"
                  />
                  <div className="checkbox-wrapper" />
                </label>
              )}
              <div className="capsule-info">
                <span className='capusle-title' style={{ color: isOpenable ? '#3b82f6' : 'inherit' }}>{capsule.title}</span>
                <div className='date-info'>
                  <span>Open Date: {openDate.toLocaleDateString()}</span>
                  <span>Create Date: {new Date(capsule.createDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="capsule-actions">
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenCapsule(capsule); }}
                  className={isOpenable ? 'openable' : 'not-openable'}
                >
                  Open
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {selectedCapsule && (
        <CapsulePopup
          capsule={selectedCapsule}
          onClose={() => setSelectedCapsule(null)}
        />
      )}

      <Alert
        message={alertMessage}
        isVisible={showAlert}
        onClose={() => handleAlertClose(false)}
        onConfirm={() => handleAlertClose(true)}
        showConfirm={pendingDelete}
      />
    </div>
  );
};

export default CapsuleList;