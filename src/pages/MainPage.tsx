import axios from 'axios';
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { adminState } from '../atom/AdminAtom';
import { ClothesType } from '../type/clothesType';
import style from '../style/MainPage.module.css';
import { useNavigate } from "react-router-dom";
import { colorList, materialList, typeList } from '../data/clothesData';

const MainPage = () => {

  const navigate = useNavigate();

  const user = useRecoilValue(adminState);
  
  const [clothesList, setClothesList] = useState<ClothesType[]>([]);
  const [originClothesList, setOriginClothesList] = useState<ClothesType[]>([]);
  const [colorState, setColorState] = useState<string>("");
  const [materialState, setMaterialState] = useState<string>("");
  const [typeState, setTypeState] = useState<string>("");
  const [training, setTrainging] = useState<number>(0);
  const [lender, setLender] = useState<boolean>(true);

  useEffect(() => {
    getClothesList();
  }, [])

  useEffect(() => {
    filteringClothes();
  }, [colorState, materialState, typeState, lender, training])
  
  const handleColor = async(e:React.ChangeEvent<HTMLSelectElement>) => {
    setColorState(e.target.value);
  };
    
  const handleType = async(e:React.ChangeEvent<HTMLSelectElement>) => {
    setTypeState(e.target.value);
  };

  const handleMaterial = async(e:React.ChangeEvent<HTMLSelectElement>) => {
    setMaterialState(e.target.value);
  };

  const handleTraining = async(e:React.ChangeEvent<HTMLSelectElement>) => {
    setTrainging(Number(e.target.value));
  }

  const filteringClothes = async() => {
    const tempClothesList:ClothesType[] = [];
    originClothesList.map((value) => {
      let check = true;
      if (!value.color.includes(colorState))
        check = false;
      if (!value.type.includes(typeState))
        check = false;
      if (!value.material.includes(materialState))
        check = false;
      if (training == 1) {
        if (!value.training)
          check = false 
      } else if (training == 2) {
        if (value.training)
          check = false;
      }
      if (check)
        tempClothesList.push(value)
    })
    setClothesList([...tempClothesList]);
  }

  const getClothesList = async() => {
    const url = import.meta.env.VITE_SERVER + "/api/admin/clothes";
    const config = { headers: {'Authorization': "Bearer " + user.accessToken} }
    await axios.get(url, config)
    .then((result) => {
      const data = result.data.data;
      setClothesList(data);
      setOriginClothesList(data);
    })
    .catch(() => {
      alert("관리자 계정이 아닙니다.")
      navigate("/")
    })
  }

  const switchTraining = async(clothesId:number) => {
    if (window.confirm("학습 여부를 변경하시겠습니까?")) {
      const url = import.meta.env.VITE_SERVER + "/api/admin/clothes/" + clothesId;
      const config = { headers: {'Authorization': "Bearer " + user.accessToken} }
      await axios.post(url, null, config)
      .catch(() => {
        return
      })
      await getClothesList();
      setLender(!lender);
    } else {
      return
    }
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
          <select onChange={handleTraining} className={style.selectBox} name="languages" id="lang">
            <option value={0}>추가학습 여부</option>
            <option value={1}>추가학습 O</option>
            <option value={2}>추가학습 X</option>
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
                      {
                        value.training?
                        <>
                          🟢
                          <br></br>
                          <button onClick={() => {
                            switchTraining(value.clothesId);
                          }} className={style.ignore}>학습 해제</button>
                        </>
                        :
                        <>
                          ❌
                          <br></br>
                          <button onClick={() => {
                            switchTraining(value.clothesId);
                          }} className={style.regist}>학습 등록</button>
                        </>
                      }                    
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