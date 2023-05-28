import { Sequelize } from "sequelize";
import { User } from "../models/models.js";

import { config } from "../config/config.js";
import { getHash } from "../utils/hashedPassword.js";

const sequelize = new Sequelize(
  config.db.DATABASE,
  config.db.USERNAME,
  config.db.PASSWORD,
  {
    host: config.db.HOST,
    dialect: config.db.DIALECT,
    logging: false,
  }
);

const createAdmin = async () => {
  const admin = (
    await User.findOne({
      where: {
        role: "admin",
      },
    })
  )?.get({ plain: true });

  const hashPassword = await getHash("admin");

  if (!admin) {
    User.build({
      firstName: "admin",
      secondName: "admin",
      email: "admin@gmail.com",
      role: "admin",
      password: hashPassword,
    }).save();
  }
};

export const runDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await createAdmin();

    console.log("\x1b[34m%s\x1b[0m", "bd on");
  } catch (e) {
    console.log("bd error: ", e);
  }
};

export default sequelize;
