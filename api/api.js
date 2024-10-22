import axios from 'axios';
import {BASE_URL,REACT_APP_API_KEY} from '@env'

const instance = axios.create({
  baseURL: BASE_URL,
  params:{
    serviceKey:REACT_APP_API_KEY,
    _type: 'json'
  }
});

export const api = {
  
  // sido:async (type, orgCd, orgdownNm)=>{
  //   const res = await instance.get(`/${type}`, {
  //       params:{
  //           orgCd: orgCd,
  //           orgdownNm: orgdownNm
  //       }
  //   });
  //   return res.data;
  // },

  sido:async ()=>{
    const res = await instance.get('sido');
    return res.data;
  },

  sigungu:async (type, uprCd, orgCd, orgdownNm)=>{
    const res = await instance.get(`/${type}`, {
      params:{
        upr_cd: uprCd,
        orgCd: orgCd,
        orgdownNm: orgdownNm
      }
    });
    return res.data;
  },
  shelter:async (type, uprCd, orgCd, careRegNo, careNm)=>{
    const res = await instance.get(`/${type}`, {
      params:{
        upr_cd: uprCd,
        org_cd: orgCd,
        careRegNo: careRegNo,
        careNm: careNm
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