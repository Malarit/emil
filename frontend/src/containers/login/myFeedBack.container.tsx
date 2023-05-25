import { MouseEvent } from "react";
import { useQuery } from "react-query";
import Box from "../../components/box";
import Vacancy from "../../components/vacancy";
import { getJustFeedback, getVacancy } from "../../services/req";

const MyFeedBackContainer: React.FC<{
  className?: string;
  classNameBox?: string;
}> = ({ className, classNameBox }) => {
  const { data: feedBack } = useQuery("feedBack", getJustFeedback);
  const { data } = useQuery("vacancy", getVacancy);

  const check = (flag: boolean | undefined) => {
    if (flag) return "Ожидайте приглашения на почту";
    else if (flag === false) return "Отклонено";
    else return "На рассмотрении";
  };

  const get = () => {
    if (!feedBack || !data) return <></>;

    return feedBack.map((item) => {
      const vac = data.find((vac) => vac.id === item.vacancy_id);

      return (
        <>
          <Vacancy
            header={vac?.header || ""}
            description={vac?.description || ""}
            disableButton={false}
            className={className}
            hideButton={true}
            onClick={() => {}}
          />
          <Box
            className={classNameBox}
            body={
              <>
                <div>
                  <div>Состояние:</div>
                  <span>{check(item.state)}</span>
                </div>
              </>
            }
          />
        </>
      );
    });
  };

  return (
    <>
      <h3>Отклики</h3> {get()}
    </>
  );
};

export default MyFeedBackContainer;
