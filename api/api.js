import axios from 'axios';
import { BASE_URL, BASE_URL_SHELTER, REACT_APP_API_KEY } from '@env'

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
    const res = await axios.get(`${BASE_URL_SHELTER}shelterInfo?serviceKey=${REACT_APP_API_KEY}&_type=json&numOfRows=30`, {
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
    const res = await axios.get('https://api-v2.deepsearch.com/v1/articles?keyword=title:(%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC%20AND%20%EB%8F%99%EB%AC%BC%20AND%20%EA%B0%95%EC%95%84%EC%A7%80)&api_key=02a270a26cfa43a4bb423a2c138880fc');
    return res.data
  }
}