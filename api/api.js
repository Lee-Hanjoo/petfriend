import axios from 'axios';
import { BASE_URL, BASE_URL_SHELTER, REACT_APP_API_KEY, REACT_APP_NEWS_API_KEY } from '@env'

export const api = {

  sido:async ()=>{
    const res = await axios.get(`${BASE_URL}sido?serviceKey=${REACT_APP_API_KEY}&_type=json`);
    return res.data;
  },

  sigungu:async (uprCd)=>{
    const res = await axios.get(`${BASE_URL}sigungu?serviceKey=${REACT_APP_API_KEY}&_type=json`, {
      params: {
        upr_cd: uprCd
      }
    });
    return res.data;
  },

  shelter:async (uprCd, orgCd)=>{
    const res = await axios.get(`${BASE_URL_SHELTER}shelterInfo?serviceKey=${REACT_APP_API_KEY}&_type=json&numOfRows=999`, {
      params: {
        upr_cd: uprCd,
        org_cd: orgCd,
      }
    });
    return res.data;
  },
  
  upKind:async (upKindCd)=>{
    const res = await axios.get(`${BASE_URL}kind?serviceKey=${REACT_APP_API_KEY}&_type=json`, {
      params: {
        up_kind_cd: upKindCd,
      }
    });
    return res.data;
  },
  news: async ()=>{
    const res = await axios.get(`https://api-v2.deepsearch.com/v1/articles?keyword=title:(%EB%8F%99%EB%AC%BC)&api_key=${REACT_APP_NEWS_API_KEY}`);
    return res.data
  }
}