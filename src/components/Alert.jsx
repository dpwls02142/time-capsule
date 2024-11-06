import React, { useCallback } from 'react';
import '../styles/Alert.css';

const Alert = ({ message, isVisible, onClose, onConfirm, showConfirm = false }) => {
  // overlay 영역(팝업 외부)을 클릭했을 때 팝업이 닫힐 수 있도록
  // e.target이 e.currentTarget(즉, overlay 자체)을 가리킬 때만 onClose 호출
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!isVisible) return null;

  // 메시지를 줄바꿈(\n) 기준으로 분리하고 각 줄에 <br /> 태그 추가하여 메시지를 포맷팅
  const formattedMessage = message.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    // overlay 영역을 클릭 시 handleOverlayClick이 호출
    <div className="alert-overlay" onClick={handleOverlayClick}>
      {/* 내부 alert 영역을 클릭해도 이벤트 전파가 되지 않도록 stopPropagation 호출 */}
      <div className="alert-container" onClick={e => e.stopPropagation()}>
        <div className="alert-content">
          {/* 포맷팅된 메시지 출력 */}
          <p>{formattedMessage}</p>
          <div className="alert-buttons">
            {/* showConfirm 값에 따라 확인 및 취소 버튼 표시 여부 결정 */}
            {/* showConfirm == True: 캡슐 삭제*/}
            {/* showConfirm == False: form에서 필수 필드 입력 안 했을 시, 아직 open날짜 안 됐는데 열려고 시도할 시*/}
            {showConfirm ? (
              <>
                {/* 확인 버튼 클릭 시 onConfirm 호출 */}
                <button onClick={onConfirm} className="alert-button confirm">
                  확인
                </button>
                {/* 취소 버튼 클릭 시 onClose 호출 */}
                <button onClick={onClose} className="alert-button cancel">
                  취소
                </button>
              </>
            ) : (
              // showConfirm이 false인 경우 확인 버튼만 표시
              <button onClick={onClose} className="alert-button">
                확인
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;