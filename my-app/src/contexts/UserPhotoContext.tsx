import { ReactNode, createContext, useContext, useState } from "react";

interface UserPhotoContextData {
  userPhoto: string;
  setUserPhoto: (photo: string) => void;
}

const UserPhotoContext = createContext<UserPhotoContextData>({
  userPhoto: "",
  setUserPhoto: () => {},
});

export const useUserPhoto = () => useContext(UserPhotoContext);

export const UserPhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPhoto, setUserPhoto] = useState("");

  return (
    <UserPhotoContext.Provider value={{ userPhoto, setUserPhoto }}>
      {children}
    </UserPhotoContext.Provider>
  );
};