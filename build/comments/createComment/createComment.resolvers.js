import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolvers(async (_, { photoId, payload }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({
        where: { id: photoId },
        select: { id: true }
      });
      if (!ok) {
        return {
          ok: false,
          error: "Photo not found"
        };
      }
      const newComment = await client.comment.create({
        data: {
          payload,
          photo: { connect: { id: photoId } },
          user: { connect: { id: loggedInUser.id } }
        }
      });
      return {
        ok: true,
        id: newComment.id
      };
    })
  }
};