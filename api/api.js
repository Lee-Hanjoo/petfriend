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
    const res = await axios.get(`${BASE_URL_SHELTER}shelterInfo?serviceKey=${REACT_APP_API_KEY}&_type=json`, {
      params: {
        upr_cd: uprCd,
        org_cd: orgCd,
      }
    });
    return res.data;
  },
  kind:async (type, upKindCd, kindCd, KNm)=>{
    const res = await instance.get(`/${type}`, {
      params:{
        up_kind_cd: upKindCd,
        kindCd: kindCd,
        KNm: KNm
      }
    });
    return res.data;
  },
  abandonmentPublic:async (type, upKindCd, kindCd, uprCd, orgCd, care_reg_no, processState, sexCd, neuterYn, specialMark, careNm, careTel, careAddr, orgNm, chargeNm, officetel, noticeComment, filename, popfile, happenPlace, colorCd, age, weight, noticeNo)=>{
    const res = await instance.get(`/${type}`, {
      params:{
        upkind: upKindCd,
        kind: kindCd,
        upr_cd: uprCd,
        org_cd: orgCd,
        care_reg_no: care_reg_no,
        processState: processState,
        sexCd: sexCd,
        neuterYn: neuterYn,
        specialMark: specialMark,
        careNm: careNm,
        careTel: careTel,
        careAddr: careAddr,
        orgNm: orgNm,
        chargeNm: chargeNm,
        officetel: officetel,
        noticeComment: noticeComment,
        filename: filename,
        popfile: popfile,
        happenPlace: happenPlace,
        colorCd: colorCd,
        age: age,
        weight: weight,
        noticeNo: noticeNo
      }
    });
    return res.data;
  },
}