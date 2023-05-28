import { Request } from "express";
import { resume } from "../models/types.js";

export interface TypedRequest<T> extends Request<{}, {}, T, T> {
  body: T;
  query: T;
}

type authorization = {
  email: string;
  password: string;
};
export type auth = TypedRequest<authorization>;

type registration = {
  firstName: string;
  secondName: string;
  password: string;
  email: string;
  role: "admin" | "user" | "worker";
};
export type reg = TypedRequest<registration>;

type user = {
  city: string;
  about: string;
};
export type userPut = TypedRequest<user>;

type userDelete = {
  id: number;
};
export type deleteUser = TypedRequest<userDelete>;

type vacancy = {
  header: string;
  description: string;
  type: "it" | "business" | "clients";
};
export type vacancyPost = TypedRequest<vacancy>;

type vacancyGet = {
  id?: number;
};
export type getVacancy = TypedRequest<vacancyGet>;

type vacancyPut = {
  id: number;
} & vacancy;
export type putVacancy = TypedRequest<vacancyPut>;

type feedback = {
  vacancy_id: number;
};
export type feedbackGet = TypedRequest<feedback>;

type feedbackPost = {
  vacancy_id: number;
};
export type postFeedback = TypedRequest<feedbackPost>;

type feedbackPut = {
  id: number;
  user_id: number;
  vacancy_id: number;
  state: boolean;
};
export type putFeedback = TypedRequest<feedbackPut>;

type updateFeedback = {
  id: number;
  state: boolean;
};
export type updateFeedbackPost = TypedRequest<updateFeedback>;

type userAdmin = {
  id: number;
  email: string;
  firstName: string;
  secondName: string;
  role: "admin" | "user" | "worker";
};
export type putUserAdmin = TypedRequest<userAdmin>;

export type putResume = TypedRequest<resume>;
