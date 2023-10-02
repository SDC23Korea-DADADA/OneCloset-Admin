import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { userType } from "../type/userType";

const { persistAtom } = recoilPersist({
  key: 'admin',
  storage: sessionStorage,
});

export const adminState = atom<userType>({
  key: "adminState",
  default: {
    email : "",
    userId : -1,
    nickname : "USER",
    accessToken : "",
    profileImg : ""
  },
  effects_UNSTABLE: [persistAtom],
});
