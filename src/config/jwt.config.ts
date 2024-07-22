require("dotenv").config();

export const jsonWebTokenConfig = {
  secret: process.env.JWT_SECRET,
  experisIn: process.env.JWT_EXPIRES_IN,
};
