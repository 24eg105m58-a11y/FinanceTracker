import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const { verify } = jwt;

export const verifyToken = (
  req,
  res,
  next
) => {

  try {

    const cookieToken =
      req.cookies?.token;

    const bearerToken =
      req.headers.authorization?.startsWith(
        "Bearer "
      )
        ? req.headers.authorization.split(
          " "
        )[1]
        : null;

    const token =
      cookieToken ||
      bearerToken;

    if (!token) {

      return res.status(401).json({
        message:
          "Authentication required",
      });
    }

    const decoded =
      verify(
        token,
        process.env.SECRET_KEY
      );

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message:
        "Session expired",
    });
  }
};