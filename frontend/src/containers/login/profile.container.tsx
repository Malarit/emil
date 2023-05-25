import React from "react";
import Profile from "../../components/profile";
import { useMutation, useQuery } from "react-query";
import { clearMe, getUser } from "../../services/req";
import { putUser } from "./../../services/req";
import { useAppDispatch } from "./../../redux/hooks";
import { setUserId } from "./../../redux/slices/account/slice";

const ProfileContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useMutation((data: { about: string; city: string }) =>
    putUser(data)
  );
  const { data } = useQuery("user", getUser, {
    refetchOnWindowFocus: false,
  });
  const [city, setCity] = React.useState("");
  const [textArea, setTextArea] = React.useState("");

  React.useEffect(() => {
    if (data) {
      setCity(data.city);
      setTextArea(data.about);
    }
  }, [data]);

  const name = data?.firstName + " " + data?.secondName;

  return (
    <>
      <Profile
        name={name}
        textArea={textArea}
        inputValue={city}
        onClickSave={() => user.mutate({ city, about: textArea })}
        onCLickLeave={() => {
          clearMe();
          dispatch(setUserId(undefined));
        }}
        onChangeInput={(e) => setCity(e.target.value)}
        onChangeTextArea={(e) => setTextArea(e.target.value)}
      />
    </>
  );
};

export default ProfileContainer;
