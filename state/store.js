
import { create } from 'zustand';
import { api } from '../api/api';


const store = create((set) => ({
  sido:{},
  sigungu:{},
  shelter:{},
  kind:{},
  abandonmentPublic:{},
  dataCtrl:async (a)=>{ 
    let res;
    switch(a.t){
      // case 'search':  break;
      case 'list' : res = await api.list(); set({list:res});
      break;

      //                   api통신 후 main에 그 통신한 res를 넣어준거임
      default : res = await api.all(); set({main:res});
    }
    
  },

  setSido: (newData) => set({ sido: newData }),
  setSigungu:(newData) => set({ sigungu: newData }),
  setShelter: (newData) => set({ coshelternt: newData }),
  setKind: (newData) => set({ kind: newData }),
  setAbandonmentPublic: (newData) => set({ abandonmentPublic: newData }),
}))

export default store