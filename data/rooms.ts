import { images } from './images';
export const rooms = [
 {slug:'cift-kisilik',name:'Çift Kişilik Oda',capacity:'2 Misafir',image:images.rooms[0],description:'Şehrin ritminden sonra sakinliğe dönebileceğiniz, ferah ve özenli bir konaklama alanı.'},
 {slug:'uc-kisilik',name:'Üç Kişilik Oda',capacity:'3 Misafir',image:images.rooms[1],description:'Birlikte seyahat edenler için konforlu, işlevsel ve aydınlık bir şehir odası.'},
 {slug:'aile-odasi',name:'Aile Odası',capacity:'4 Misafir',image:images.rooms[2],description:'Bolu’yu ailece keşfederken herkes için rahatlık sunan geniş yaşam alanı.'}
].map(r=>({...r,features:['Klima','Yüksek hızlı Wi‑Fi','Özel banyo','Günlük temizlik']}));
