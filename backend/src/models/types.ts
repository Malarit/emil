import { ModelDefined, Optional } from "sequelize";

export type nodeAttributes<T, key extends keyof T> = Optional<T, key>;

interface user {
  id: number;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  role: "admin" | "user" | "worker";
}
export type user_model = ModelDefined<user, nodeAttributes<user, "id">>;

interface resume {
  id: number;
  about: string;
  city: string;
  user_id: number;
}
export type resume_model = ModelDefined<resume, nodeAttributes<resume, "id">>;

interface vacancy {
  id: number;
  header: string;
  description: string;
  type: "it" | "business" | "clients";
}
export type vacancy_model = ModelDefined<
  vacancy,
  nodeAttributes<vacancy, "id">
>;

interface Feedback {
  id: number;
  user_id: number;
  vacancy_id: number;
  state: boolean;
}
export type feedback_model = ModelDefined<
  Feedback,
  nodeAttributes<Feedback, "id" | "state">
>;
