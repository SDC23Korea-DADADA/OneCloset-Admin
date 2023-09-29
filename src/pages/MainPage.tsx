import axios from 'axios';
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { adminState } from '../atom/AdminAtom';
import { ClothesType } from '../type/clothesType';

function MainPage() {

  const user = useRecoilValue(adminState);
  const [clothesList, setClothesList] = useState<ClothesType[]>([]);

  useEffect(() => {
    getClothesList();
    console.log(clothesList)
  }, [])

  async function getClothesList() {
    const url = import.meta.env.VITE_SERVER + "/api/admin/clothes";
    const config = {
      headers: {
        'Authorization': "Bearer " + user.accessToken,
      }
    }
    await axios.get(url, config)
    .then((result) => {
      const data = result.data.data;
      setClothesList(data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <>
      <h1>관리자 페이지</h1>
      {
        clothesList.map((value, index) => {
          return(
            <div key={index}>
              <img src={value.image}></img>
            </div>
          )
        })
      }
    </>
  )
}


export default MainPage;