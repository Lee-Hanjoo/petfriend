import React, { createContext, useState, useContext } from 'react';
import { ImgPath } from './ImgPath';

// Context 생성
const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext); // 간편하게 사용하기 위한 훅

export function MenuProvider({ children }) {

  const [menuActive, setMenuActive] = useState('home');

  const menuItems = [
    { title: 'home', icon: ImgPath.home, activeIcon: ImgPath.home_white },
    { title: 'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt, activeIcon: ImgPath.adopt_white },
    { title: 'story', krTitle:'스토리', icon: ImgPath.story, activeIcon: ImgPath.story_white },
    { title: 'map', krTitle:'시설 찾기', icon: ImgPath.map, activeIcon: ImgPath.map_white },
    { title: 'missing', krTitle:'실종 동물 찾기 및 신고'},
    { title: 'community', krTitle:'커뮤니티'},
  ];

  const [location, setLocation] = useState([
    { label: '서울특별시', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '바나나', value: 'banana' },
    { label: '사과', value: 'apple' },
  ]);

  const [board, setBoard] = useState([
    { label: '스토리', value: 'story' },
    { label: '실종 동물 찾기', value: 'missing' },
  ]);

  const [storyCategory, setStoryCategory] = useState([
    { label: '입양후기', value: 'adoptReview' },
    { label: '임보일기', value: 'protection' },
    { label: '입양일기', value: 'adoptDiary' },
  ]);
  const [missingCategory, setMissingCategory] = useState([
    { label: '전체', value: 'all' },
    { label: '실종', value: 'lost' },
    { label: '목격', value: 'look' },
    { label: '완료', value: 'find' },
  ]);
  
  return (
    <MenuContext.Provider 
      value={{ 
        menuActive, setMenuActive,
        menuItems,
        location, setLocation,
        board, setBoard,
        storyCategory, setStoryCategory,
        missingCategory, setMissingCategory
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
