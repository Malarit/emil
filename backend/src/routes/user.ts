import { Router } from "express";

import * as req from "./type.js";

import { Feedback, Resume, User, Vacancy } from "../models/models.js";
import { getHash, verifieHash } from "../utils/hashedPassword.js";
import { config, cookie } from "../config/config.js";
import { jwtSign } from "../utils/jwt.js";
import { bdFindOne } from "../db/query.js";

import verifyToken from "../utils/verifyToken.js";
import { Op } from "sequelize";
import objToArray from "../utils/objToArray.js";

const router = Router();

router.get("/itsMe", async (req, res) => {
  const id = await verifyToken(req, res);
  if (!id) return;

  const user = await bdFindOne(User, {
    attributes: { exclude: ["password", "email"] },
    where: {
      id,
    },
  });

  if (id) res.status(200).json({ id: user.id, role: user.role });
});

router.get("/create", async (req, res) => {
  const hashPassword = await getHash("qwe");

  await User.build({
    firstName: "qweqwe",
    secondName: "qweqwe",
    email: "qwe@gmail.com",
    password: hashPassword,
    role: "worker",
  }).save();

  res.status(200).json("Ok");
});

router.get("/createAdmin", async (req, res) => {
  const hashPassword = await getHash("admin");

  await User.build({
    firstName: "admin",
    secondName: "admin",
    email: "admin@gmail.com",
    password: hashPassword,
    role: "admin",
  }).save();

  res.status(200).json("Ok");
});

router.get("/clearMe", async (req, res) => {
  res
    .cookie(config.jwt.ACCESS_TOKEN_NAME, "", { ...cookie, maxAge: 0 })
    .status(200)
    .json("cookie clear");
});

router.post("/authorization", async (req: req.auth, res) => {
  try {
    const { email, password } = req.body;

    const user = await bdFindOne(User, {
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json("Couldn't find the user ");
      return;
    }

    const verifie = await verifieHash(password, user.password);

    if (verifie) {
      const token = jwtSign(user?.id);
      res
        .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
        .status(200)
        .json({ role: user.role });
    } else {
      res.status(400).json("Failed verifie password");
    }
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

router.post("/registration", async (req: req.reg, res) => {
  try {
    const { password, email, firstName, secondName, role } = req.body;

    const hashPassword = await getHash(password);

    await User.build({
      firstName,
      secondName,
      email,
      password: hashPassword,
      role: role ?? "user",
    }).save();

    const user = await bdFindOne(User, {
      where: {
        email: email,
      },
    });

    const token = jwtSign(user?.id);

    res
      .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
      .status(200)
      .json("cookie set");
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

router.get("/user", async (req, res) => {
  const id = await verifyToken(req, res);
  if (!id) return;

  const user = await bdFindOne(User, {
    attributes: { exclude: ["password", "email", "role"] },
    where: {
      id,
    },
  });

  const resume = await bdFindOne(Resume, {
    attributes: { exclude: ["id"] },
    where: {
      user_id: id,
    },
  });

  res.status(200).json({ ...user, ...resume });
});

router.put("/user", async (req: req.userPut, res) => {
  const id = await verifyToken(req, res);
  if (!id) return;

  const { city, about } = req.body;

  const resume = await Resume.findOne({
    where: {
      user_id: id,
    },
  });

  if (!resume) {
    await Resume.build({
      city,
      about,
      user_id: id,
    }).save();
    res.status(200).json("Ok");
    return;
  }

  await resume
    .set({
      city,
      about,
    })
    .save();

  res.status(200).json("Ok");
});

router.post("/feedback", async (req: req.postFeedback, res) => {
  const id = await verifyToken(req, res);
  if (!id) return;

  const { vacancy_id } = req.body;

  Feedback.build({
    user_id: id,
    vacancy_id,
  }).save();

  res.status(200).json("Ok");
});

router.get("/justFeedback", async (req, res) => {
  // Для юсера
  const id = await verifyToken(req, res);
  if (!id) return;

  const result = await Feedback.findAll({
    where: {
      user_id: id,
    },
  });

  res.status(200).json(result);
});

router.get("/feedback", async (req: req.feedbackGet, res) => {
  // Для сотрудника
  const { vacancy_id } = req.query;

  const feedbacks = (
    await Feedback.findAll({
      where: {
        vacancy_id,
      },
    })
  ).map((item) => item.get({ plain: true }));

  const users_id = objToArray(feedbacks, "user_id") as number[];

  const users = (
    await User.findAll({
      attributes: ["firstName", "secondName", "email", "id"],
      where: {
        id: users_id,
      },
    })
  ).map((item) => item.get({ plain: true }));

  const resumes = (
    await Resume.findAll({
      where: {
        user_id: users_id,
      },
    })
  ).map((item) => item.get({ plain: true }));

  let result = users.map((item) => {
    const { firstName, secondName, email, id } = item;
    const resume = resumes.find((item) => item.user_id === id);
    const state = feedbacks.find((item) => item.user_id === id)?.state;

    return {
      firstName,
      secondName,
      email,
      id,
      about: resume?.about,
      city: resume?.city,
      state: state?.toString() || "",
    };
  });

  res.status(200).json(result);
});

router.post("/updateFeedback", async (req: req.updateFeedbackPost, res) => {
  const { id, state } = req.body;

  const feedback = await Feedback.findOne({
    where: {
      user_id: id,
    },
  });

  feedback
    ?.set({
      state,
    })
    .save();

  res.status(200).json("Ok");
});

router.get("/vacancy", async (req: req.getVacancy, res) => {
  const { id } = req.query;

  try {
    const vacancy = id
      ? await bdFindOne(Vacancy, {
          where: {
            id,
          },
        })
      : await Vacancy.findAll();

    res.status(200).json(vacancy);
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

export default router;
