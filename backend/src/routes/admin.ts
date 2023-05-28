import { Request, Response, Router } from "express";
import { Feedback, Resume, User, Vacancy } from "../models/models.js";

import * as req from "./type.js";

const router = Router();

router.get("/users", async (req, res) => {
  const user = await User.findAll();
  res.status(200).json(user);
});

router.put("/user", async (req: req.putUserAdmin, res) => {
  const { id, firstName, secondName, email, role } = req.body;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  user
    ?.set({
      firstName,
      secondName,
      email,
      role,
    })
    .save();

  res.status(200).json("Ok");
});

router.delete("/user", async (req: req.deleteUser, res) => {
  const { id } = req.query;
  console.log(id);
  await User.destroy({
    where: {
      id,
    },
  });

  res.status(200).json("Ok");
});

router.post("/vacancy", async (req: req.vacancyPost, res) => {
  const { header, description, type } = req.body;
  try {
    Vacancy.build({
      header,
      description,
      type,
    }).save();

    res.status(200).json("Ok");
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

router.put("/vacancy", async (req: req.putVacancy, res) => {
  const { id, ...vac } = req.body;
  try {
    const vacancy = await Vacancy.findOne({
      where: {
        id,
      },
    });

    vacancy?.set(vac).save();

    res.status(200).json("Ok");
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

router.delete("/vacancy", async (req: req.deleteUser, res) => {
  const { id } = req.query;

  await Vacancy.destroy({
    where: {
      id,
    },
  });

  res.status(200).json("Ok");
});

router.put("/feedback", async (req: req.putFeedback, res) => {
  const { id, ...feed } = req.body;
  try {
    const feedback = await Feedback.findOne({
      where: {
        id,
      },
    });

    feedback?.set(feed).save();

    res.status(200).json("Ok");
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

router.get("/resumes", async (req, res) => {
  const resumes = Resume.findAll();
  res.status(200).json(resumes);
});

router.put("/resumes", async (req: req.putResume, res) => {
  const { id, ...resu } = req.body;

  try {
    const resume = await Resume.findOne({
      where: {
        id,
      },
    });

    resume?.set(resu).save();

    res.status(200).json("Ok");
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

export default router;
