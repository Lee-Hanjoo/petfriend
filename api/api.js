import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/',
  params:{
    api_key:process.env.REACT_APP_API_KEY,
  }
});

export const api = {
  // all: async ()=>{
  //   let url = [
  //     instance.get('/sido'), 
  //     instance.get('/sigungu'), 
  //     instance.get('/shelter'), 
  //     instance.get('/kind'), 
  //     instance.get('/abandonmentPublic'), 
  //   ]
  //   let [sido,sigungu,shelter,kind,abandonmentPublic] = await Promise.all(url); 
  //   sido = res.data.response.body.items.item
  //   sigungu = res.data.response.body.items.item

  //   return {sido,sigungu,shelter,kind,abandonmentPublic};
  // },
  
  sido:async (type, orgCd, orgdownNm)=>{
    const res = await instance.get(`/${type}`, {
        params:{
            orgCd: orgCd,
            orgdownNm: orgdownNm
        }
    });
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