import React, { createContext, useState, useContext, useEffect } from 'react';
import { ImgPath } from './ImgPath';
import { useMemo } from 'react'

// Context 생성
const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext); // 간편하게 사용하기 위한 훅

export function MenuProvider({ children }) {

  const [menuActive, setMenuActive] = useState('home');
  const [detailActive, setDetailActive] = useState('home')
  const [findActive, setFindActive] = useState('id')
  const [completeActive, setCompleteActive] = useState('id')

  // 이전페이지 저장
  const [previousMenuActive, setPreviousMenuActive] = useState(null);


  useEffect(() => {
    if (menuActive !== 'write' && menuActive !== 'detail') {
      setPreviousMenuActive(menuActive);
    }
  }, [menuActive]);

  // const handleGoBack = () => {
  //   if (menuActive === 'write' || menuActive === 'detail') {
  //     setMenuActive(previousMenuActive); // 이전 메뉴로 돌아가기
  //   }
  // };

  const menuItems = [
    { title: 'home', krTitle:'홈', icon: ImgPath.home, activeIcon: ImgPath.home_white, menuIcon: ImgPath.home_black },
    { title: 'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt, activeIcon: ImgPath.adopt_white, menuIcon: ImgPath.adopt_black },
    { title: 'story', krTitle:'스토리', icon: ImgPath.story, activeIcon: ImgPath.story_white, menuIcon: ImgPath.story_black },
    { title: 'map', krTitle:'시설 찾기', icon: ImgPath.map, activeIcon: ImgPath.map_white, menuIcon: ImgPath.map_black },
    { title: 'missing', krTitle:'실종 동물 찾기 및 신고', icon: ImgPath.missing, activeIcon: ImgPath.missing_white, menuIcon: ImgPath.missing_black},
    { title: 'community', krTitle:'커뮤니티', icon: ImgPath.community, activeIcon: ImgPath.community_white, menuIcon: ImgPath.community_black},
  ];

  // select
  const [location, setLocation] = useState([
    { label: '서울특별시', value: 'seoul' },
    { label: '부산', value: 'busan' },
    { label: '바나나', value: 'banana' },
    { label: '사과', value: 'apple' },
  ]);

  const [city, setCity] = useState([
    { label: '중랑구', value: 'junglanggu' },
  ]);

  const [animal, setAnimal] = useState([
    { label: '강아지', value: 'dog' },
    { label: '고양이', value: 'cat' },
    { label: '기타', value: 'else' },
  ]);

  const [breed, setBreed] = useState([
    { label: '그레이 하운드', value: 'ho' },
    { label: '말티즈', value: 'ma' },
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

  // radio  
  const gender = useMemo(() => ([
    { id: 'gender_default', label: '수컷', value: 'male', selected: true },
    { id: 'gender_0', label: '암컷', value: 'female', selected: false },
    { id: 'gender_1', label: '모름', value: 'undefined', selected: false },
]), []);

  const age = useMemo(() => ([
    { id: 'age_default', label: '1년 이상', value: 'year1', selected: true },
    { id: 'age_1', label: '모름', value: 'undefined', selected: false },
    { id: 'age_2', label: '기타', value: 'else', selected: false },
]), []);

  const neutering = useMemo(() => ([
    { id: 'neutering_default', label: '완료', value: 'neutering_yes', selected: true },
    { id: 'neutering_1', label: '미완료', value: 'neutering_no', selected: false },
    { id: 'neutering_2', label: '모름', value: 'undefined', selected: false },
]), []);
  
  return (
    <MenuContext.Provider 
    value={{ 
        // menu
        menuActive, setMenuActive,
        detailActive, setDetailActive,
        previousMenuActive, setPreviousMenuActive,
        findActive, setFindActive,
        // select
        menuItems,
        location, setLocation,
        city, setCity,
        animal, setAnimal,
        breed, setBreed,
        board, setBoard,
        storyCategory, setStoryCategory,
        missingCategory, setMissingCategory,
        // radio
        gender, age, neutering
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
