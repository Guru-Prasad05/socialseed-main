import { compare } from "bcrypt";
import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";
import { processHashtag } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolvers(async (_, { id, caption }, loggedInUser) => {
      const oldPhoto = await client.photo.findFirst({
        where: { id, userId: loggedInUser.id },
        include: { hashtags: { select: { hashtag: true } } },
      });
      if (!oldPhoto) {
        return {
          ok: false,
          error: "You must login to perform the task",
        };
      }
      await client.photo.update({
        where: { id },
        data: {
          caption,
          hashtags: {
            disconnect: oldPhoto.hashtags,
            connectOrCreate: processHashtag(caption),
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
