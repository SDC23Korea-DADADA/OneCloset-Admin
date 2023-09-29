import axios from 'axios';
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { adminState } from '../atom/AdminAtom';
import { ClothesType } from '../type/clothesType';
import style from '../style/MainPage.module.css';


const MainPage = () => {

  const colorList = ["블랙", "네이비", "블루", "그린", "퍼플", "스카이블루",
    "그레이", "카키", "민트", "브라운", "와인", "베이지", "라벤더", "레드",
    "오렌지", "핑크", "옐로우", "화이트", "다채색"];

  const materialList = ["면", "니트", "데님",
  "시폰", "패딩", "트위드",
  "플리스", "가죽", "코듀로이"];

  const typeList = ["긴팔티", "반팔티", "셔츠/블라우스", 
    "니트웨어", "후드티", "민소매", "긴바지", "반바지",
    "롱스커트", "미니스커트", "코트", "재킷", "점퍼/짚업",
    "패딩", "가디건", "베스트", "원피스", "점프수트"
  ];

  const user = useRecoilValue(adminState);
  
  const [clothesList, setClothesList] = useState<ClothesType[]>([]);
  const [originClothesList, setOriginClothesList] = useState<ClothesType[]>([]);
  const [colorState, setColorState] = useState<string>("");
  const [materialState, setMaterialState] = useState<string>("");
  const [typeState, setTypeState] = useState<string>("");

  useEffect(() => {
    getClothesList();
  }, [])

  useEffect(() => {
    filteringClothes();
  }, [colorState, materialState, typeState])
  
  const handleColor = async(e:any) => {
    setColorState(e.target.value);
  };
    
  const handleType = async(e:any) => {
    setTypeState(e.target.value);
  };

  const handleMaterial = async(e:any) => {
    setMaterialState(e.target.value);
  };

  const filteringClothes = () => {
    const tempClothesList:ClothesType[] = [];
    originClothesList.map((value) => {
      let check = true;
      if (!value.color.includes(colorState))
        check = false;
      if (!value.type.includes(typeState))
        check = false;
      if (!value.material.includes(materialState))
        check = false;
      if (check) {
        tempClothesList.push(value)
      }
    })
    setClothesList([...tempClothesList]);
  }

  async function getClothesList() {
    const url = import.meta.env.VITE_SERVER + "/api/admin/clothes";
    const config = { headers: {'Authorization': "Bearer " + user.accessToken} }
    await axios.get(url, config)
    .then((result) => {
      const data = result.data.data;
      setClothesList(data);
      setOriginClothesList(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <>
      <div className={style.sub_wrap}>
        <div className={style.sub_con}>
        <h2>&nbsp;&nbsp;선택 의류 : {clothesList.length}&nbsp;- 신규 등록 의류 : {originClothesList.length}</h2>
        <div className={style.select}>
          <select onChange={handleColor} className={style.selectBox} name="languages" id="lang">
            <option value={""}>색상</option>
            {
              colorList.map((value, index) => {
                return(
                  <option key={index} value={value}>{value}</option>
                )
              })
            }
          </select>
          <select onChange={handleType} className={style.selectBox} name="languages" id="lang">
            <option value={""}>종류</option>
            {
              typeList.map((value, index) => {
                return(
                  <option key={index} value={value}>{value}</option>
                )
              })
            }
          </select>
          <select onChange={handleMaterial} className={style.selectBox} name="languages" id="lang">
            <option value={""}>재질</option>
            {
              materialList.map((value, index) => {
                return(
                  <option key={index} value={value}>{value}</option>
                )
              })
            }
          </select>
        </div>
        <table>
          <thead>
          <tr>
              <th>No</th>
              <th>의류</th>
              <th>색상</th>
              <th>종류</th>
              <th>재질</th>
              <th>추가학습</th>
          </tr>
          </thead>
          <tbody>
            {
              clothesList.map((value, index) => {
                return(
                  <tr className={style.tableText} key={index}>
                    <td>{index + 1}</td>
                    <td><img className={style.clothes} src={value.image}/></td>
                    <td>{value.color}</td>
                    <td>{value.type}</td>
                    <td>{value.material}</td>
                    <td>
                    <input className={style.check} type="checkbox" id="scales" name="scales"/>
                    <br></br>
                    <button className={style.ignore}>삭제</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <br></br><br></br>
        </div>
      </div>
    </>
  )
}


export default MainPage;