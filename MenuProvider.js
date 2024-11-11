import React, { createContext, useState, useContext, useEffect } from 'react';
import { ImgPath } from './ImgPath';
import { useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context 생성
const MenuContext = createContext();
const SessionContext = createContext();

export const useMenu = () => useContext(MenuContext); // 간편하게 사용하기 위한 훅
export const useSession = () => useContext(SessionContext); // 간편하게 사용하기 위한 훅

export function MenuProvider({ children }) {
  const [session, setSession] = useState(null);

   useEffect(() => {
      const loadSession = async () => {
       try {
        const token = await AsyncStorage.getItem('@user');
        setSession(token || null);
       } catch (error) {
        // console.error('Error loading session:', error);
       }
      };
      loadSession();
     }, []);

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

  const menuItems = [
    { title: 'home', krTitle:'홈', icon: ImgPath.home, activeIcon: ImgPath.home_white, menuIcon: ImgPath.home_black },
    { title: 'adopt', krTitle:'입양 대기 동물', icon: ImgPath.adopt, activeIcon: ImgPath.adopt_white, menuIcon: ImgPath.adopt_black },
    { title: 'story', krTitle:'스토리', icon: ImgPath.story, activeIcon: ImgPath.story_white, menuIcon: ImgPath.story_black },
    { title: 'map', krTitle:'시설 찾기', icon: ImgPath.map, activeIcon: ImgPath.map_white, menuIcon: ImgPath.map_black },
    { title: 'missing', krTitle:'실종 동물 찾기 및 신고', icon: ImgPath.missing, activeIcon: ImgPath.missing_white, menuIcon: ImgPath.missing_black},
    { title: 'community', krTitle:'커뮤니티', icon: ImgPath.community, activeIcon: ImgPath.community_white, menuIcon: ImgPath.community_black},
  ];

  // select
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
  // 동물성별
  const gender = useMemo(() => ([
    { id: 'gender_default', label: '수컷', value: 'male', selected: true },
    { id: 'gender_0', label: '암컷', value: 'female', selected: false },
    { id: 'gender_1', label: '모름', value: 'undefined', selected: false },
  ]), []);

  // 사람성별
  const sex = useMemo(() => ([
    { id: 'sex_default', label: '남성', value: 'male', selected: true },
    { id: 'sex_0', label: '여성', value: 'female', selected: false },
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
        session,setSession,
        // menu
        menuActive, setMenuActive,
        detailActive, setDetailActive,
        previousMenuActive, setPreviousMenuActive,
        findActive, setFindActive,
        completeActive, setCompleteActive,
        // select
        menuItems,
        board, setBoard,
        storyCategory, setStoryCategory,
        missingCategory, setMissingCategory,
        // radio
        gender, age, neutering, sex
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
