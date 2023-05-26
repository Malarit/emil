import React, { useEffect } from "react";
import Vacancy from "../../components/vacancy";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { selectUserId } from "./../../redux/slices/account/selectors";
import { useMutation, useQuery } from "react-query";
import {
  getJustFeedback,
  getVacancy,
  postFeedback,
  vac,
} from "./../../services/req";
import objToArray from "../../utils/objToArray";
import Button from "../../components/button";
import { addFeedBack, fetchFeedback } from "../../redux/slices/feedback/slice";
import { selectFeedbacks } from "../../redux/slices/feedback/selectors";

type stateCategory = "it" | "business" | "clients" | "";

const VacancyContainer: React.FC<{
  className: string;
  classNameASD?: string;
}> = ({ className, classNameASD }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const feedBack = useAppSelector(selectFeedbacks);
  const vac = useMutation((data: { vacancy_id: number }) => postFeedback(data));
  const [category, setCategory] = React.useState<stateCategory>("");

  const { data } = useQuery("vacancy", () => getVacancy<vac[]>(), {
    retry: false,
  });

  const feedBackVacId = objToArray(feedBack, "vacancy_id");

  const dataCategory = category
    ? data?.filter((item) => item.type === category)
    : data;

  React.useEffect(() => {
    dispatch(fetchFeedback());
  }, []);

  const setStateCategory = (val: stateCategory) => {
    return (curr: stateCategory) => (curr === val ? "" : val);
  };

  return (
    <>
      <div className={classNameASD}>
        <Button
          onClick={() => setCategory(setStateCategory("it"))}
          text={"ИТ"}
          disableFill={category !== "it"}
        />
        <Button
          onClick={() => setCategory(setStateCategory("business"))}
          text={"Бизнес"}
          disableFill={category !== "business"}
        />
        <Button
          onClick={() => setCategory(setStateCategory("clients"))}
          text={"Клиенты"}
          disableFill={category !== "clients"}
        />
      </div>
      {dataCategory?.map((item, key) => (
        <div key={key} className={className}>
          <Vacancy
            header={item.header}
            description={item.description}
            disableButton={!Boolean(userId) || feedBackVacId.includes(item.id)}
            onClick={() => {
              if (userId && !feedBackVacId.includes(item.id)) {
                dispatch(addFeedBack({ user_id: userId, vacancy_id: item.id }));
                vac.mutate({
                  vacancy_id: item.id,
                });
              }
            }}
            linkToId={item.id}
          />
        </div>
      ))}
    </>
  );
};

export default VacancyContainer;
