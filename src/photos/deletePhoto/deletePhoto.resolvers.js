import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!photo) {
        return {
          ok: false,
          erorr: "Photo not found",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not Authorized",
        };
      } else {
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};
