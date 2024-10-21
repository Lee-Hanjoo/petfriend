import axios from 'axios';

const serviceKey = process.env.REACT_APP_API_KEY

const instance = axios.create({
  baseURL: 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?serviceKey=',
  params:{
    api_key:process.env.REACT_APP_API_KEY,
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
    const res = await axios.get(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?serviceKey=PNTnhM9wrxsZHo8d6ib69yUDWPKWGaTFlsey6wJEWn%2BNRugZHuKG3TliH4YsI2yhJGl0A4QUtryHa6WyDFWDzw%3D%3D&_type=json`);
    // .get(url, {params: {serviceKey: 'key'}})   <<<왜 안되는지 쌤한테 질문
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