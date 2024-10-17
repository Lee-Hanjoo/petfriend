import React, { createContext, useState, useContext } from 'react';
import { ImgPath } from './ImgPath';
import { useMemo } from 'react'

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
    { id: 'gender_1', label: '수컷', value: 'male' },
    { id: 'gender_2', label: '암컷', value: 'female' },
    { id: 'gender_3', label: '모름', value: 'undefined' },
]), []);

  const age = useMemo(() => ([
    { id: 'age_1', label: '1년 이상', value: 'year1' },
    { id: 'age_2', label: '모름', value: 'undefined' },
    { id: 'age_3', label: '기타', value: 'else' },
]), []);

  const neutering = useMemo(() => ([
    { id: 'neutering_1', label: '완료', value: 'neutering_yes' },
    { id: 'neutering_2', label: '미완료', value: 'neutering_no' },
    { id: 'neutering_3', label: '모름', value: 'undefined' },
]), []);
  
  return (
    <MenuContext.Provider 
      value={{ 
        // select
        menuActive, setMenuActive,
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
