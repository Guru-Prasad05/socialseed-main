import jwt from "jsonwebtoken";
import client from "../client.js";
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await client.user.findUnique({ where: { id } });
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolvers(ourResolvers) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "You must have logged in to perform this action.",
        };
      }
    }
    return ourResolvers(root, args, context, info);
  };
}
