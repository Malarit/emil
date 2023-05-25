import React from "react";
import Vacancy from "../../components/vacancy";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { selectUserId } from "./../../redux/slices/account/selectors";
import { useMutation, useQuery } from "react-query";
import {
  getJustFeedback,
  getVacancy,
  postFeedback,
} from "./../../services/req";
import objToArray from "../../utils/objToArray";
import Button from "../../components/button";

const VacancyContainer: React.FC<{
  className: string;
  classNameASD?: string;
}> = ({ className, classNameASD }) => {
  const userId = useAppSelector(selectUserId);
  const vac = useMutation((data: { vacancy_id: number }) => postFeedback(data));
  const [feed, setFeed] = React.useState<number[]>([]);
  const [category, setCategory] = React.useState<
    "it" | "business" | "clients" | ""
  >("");

  const { data } = useQuery("vacancy", getVacancy);
  const { data: feedBack } = useQuery("feedBack", getJustFeedback);

  const feedBackVacId = objToArray(feedBack, "vacancy_id");

  const dataCategory =  category ? data?.filter((item) => item.type === category) : data;

  return (
    <>
      <div className={classNameASD}>
        <Button
          onClick={() => setCategory("it")}
          text={"ИТ"}
          disableFill={category !== "it"}
        />
        <Button
          onClick={() => setCategory("business")}
          text={"Бизнес"}
          disableFill={category !== "business"}
        />
        <Button
          onClick={() => setCategory("clients")}
          text={"Клиенты"}
          disableFill={category !== "clients"}
        />
      </div>
      {dataCategory?.map((item) => (
        <div className={className}>
          <Vacancy
            header={item.header}
            description={item.description}
            disableButton={
              !Boolean(userId) ||
              feedBackVacId.includes(item.id) ||
              feed.includes(item.id)
            }
            onClick={() => {
              if (
                userId &&
                !feedBackVacId.includes(item.id) &&
                !feed.includes(item.id)
              ) {
                setFeed((curr) => [...curr, item.id]);
                vac.mutate({
                  vacancy_id: item.id,
                });
              }
            }}
          />
        </div>
      ))}
    </>
  );
};

export default VacancyContainer;
