# Message Bottle

### 프로젝트 소개
사용자가 미래 날짜를 설정하고, 그 날짜에 과거에 작성한 추억을 열어볼 수 있는 웹사이트. 닌텐도 게임 "동물의 숲"에 등장하는 '메시지 보틀' 아이템에서 영감을 받아 개발되었으며, 타임캡슐의 원리를 웹 환경에서 구현함.

### 프로젝트 설명
- **프레임워크**: React + Vite
- **데이터 저장 방식**: 프론트엔드로만 구현하여 데이터를 사용자 브라우저의 로컬 스토리지에 저장함.
    ```javascript
    const savedCapsules = JSON.parse(localStorage.getItem('capsules')) || [];
    ```

### 프로젝트 데모 영상
[영상](https://youtu.be/dROVKD7QpoQ)

### 구동 방법
1. 첨부한 파일 압축을 풀고, 해당 폴더가 위치한 경로로 이동.
2. 터미널에서 다음 명령어를 입력하여 로컬 서버 실행 후 터미널에 뜨는 주소로 이동.
   ```bash
   npm run dev
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
