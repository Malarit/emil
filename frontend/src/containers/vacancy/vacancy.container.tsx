import React from "react";
import { useParams } from "react-router-dom";

import Vacancy from "../../components/vacancy";
import { useMutation, useQuery } from "react-query";
import {
  getJustFeedback,
  getVacancy,
  postFeedback,
  vac,
} from "../../services/req";
import objToArray from "../../utils/objToArray";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserId } from "../../redux/slices/account/selectors";
import { selectFeedbacks } from "../../redux/slices/feedback/selectors";
import { addFeedBack, fetchFeedback } from "../../redux/slices/feedback/slice";

const VacancyContainer: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const vacId = Number(params.id);
  const userId = useAppSelector(selectUserId);
  const feedBack = useAppSelector(selectFeedbacks);
  const vac = useMutation((data: { vacancy_id: number }) => postFeedback(data));

  const { data } = useQuery(
    ["vacancyOne", vacId],
    () => getVacancy<vac>(vacId),
    {
      retry: false,
    }
  );

  const feedBackVacId = objToArray(feedBack, "vacancy_id");

  React.useEffect(() => {
    if (!feedBack) {
      dispatch(fetchFeedback());
    }
  }, []);

  return (
    <Vacancy
      header={data?.header || ""}
      description={data?.description || ""}
      disableButton={!Boolean(userId) || feedBackVacId.includes(data?.id)}
      onClick={() => {
        if (data && userId && !feedBackVacId.includes(data.id)) {
          dispatch(addFeedBack({ user_id: userId, vacancy_id: data.id }));
          vac.mutate({
            vacancy_id: data.id,
          });
        }
      }}
      linkToId={0}
      hideLink
      disableTextSlice
    />
  );
};

export default VacancyContainer;
