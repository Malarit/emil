import React from "react";
import ReactPaginate from "react-paginate";
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
import Paginate from "../../components/paginate";

type stateCategory = "it" | "business" | "clients" | "";

const calcPaginate = (
  arr: any[] | undefined,
  pageSize: number,
  page: number
) => {
  if (!arr) return { pages: 0, result: [] };

  const offset = page * pageSize === 0 ? pageSize : page * pageSize;
  const pages = Math.ceil(arr.length / pageSize);
  const result = [];

  for (let i = offset - pageSize; i < offset; i++) {
    if (arr[i]) result.push(arr[i]);
  }

  return { pages, result };
};

const VacancyContainer: React.FC<{
  className: string;
  classNameASD?: string;
  paginateClassName?: string;
}> = ({ className, classNameASD, paginateClassName }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const feedBack = useAppSelector(selectFeedbacks);
  const vac = useMutation((data: { vacancy_id: number }) => postFeedback(data));
  const [category, setCategory] = React.useState<stateCategory>("");
  const [currentPage, setCurrentPage] = React.useState(0);

  const { data } = useQuery("vacancy", () => getVacancy<vac[]>(), {
    retry: false,
  });

  const feedBackVacId = objToArray(feedBack, "vacancy_id");

  const dataCategory = category
    ? data?.filter((item) => item.type === category)
    : data;

  const { pages, result } = calcPaginate(dataCategory, 3, currentPage);

  React.useEffect(() => {
    dispatch(fetchFeedback());
  }, []);

  const setStateCategory = (val: stateCategory) => {
    setCurrentPage(0);
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
      {result?.map((item, key) => (
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
      <div className={paginateClassName}>
        <Paginate
          pageCount={pages}
          onPageChange={({ selected }) => {
            setCurrentPage(selected);
          }}
        />
      </div>
    </>
  );
};

export default VacancyContainer;
