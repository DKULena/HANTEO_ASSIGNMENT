```
hanteo-coding/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── components/                 # 리액트 컴포넌트들
│   │   ├── common/                 # 공통 컴포넌트
│   │   │   ├── ErrorMessage.jsx    # 에러 메시지 컴포넌트
│   │   │   └── LoadingIndicator.jsx # 로딩 인디케이터 컴포넌트
│   │   ├── BannerSlider.jsx        # 배너 슬라이더 컴포넌트
│   │   ├── ContentList.jsx         # 콘텐츠 리스트 컴포넌트
│   │   ├── ContentListItem.jsx     # 개별 콘텐츠 아이템 컴포넌트
│   │   └── TabMenu.jsx             # 상단 탭 메뉴 컴포넌트
│   ├── data/             # 데이터 관련 파일
│   │   └── mockData.js   # 더미 데이터 및 데이터 로딩 함수
│   ├── hooks/            # 커스텀 훅
│   │   └── useTouchSwipe.js # 터치 스와이프 감지 커스텀 훅
│   ├── styles/           # 스타일 파일들
│   │   ├── _animations.scss # 애니메이션 정의
│   │   ├── _mixins.scss    # SCSS 믹스인
│   │   ├── _reset.scss     # CSS 리셋
│   │   ├── _variables.scss # 스타일 변수
│   │   ├── App.scss        # App 컴포넌트 스타일
│   │   ├── BannerSlider.scss # 배너 슬라이더 스타일
│   │   ├── ContentList.scss  # 콘텐츠 리스트 스타일
│   │   ├── index.scss        # 메인 스타일
│   │   └── TabMenu.scss      # 탭 메뉴 스타일
│   ├── App.jsx 
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── yarn.lock
```
