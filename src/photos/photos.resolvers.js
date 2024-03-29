const client = require("../client");

module.exports= {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),

    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photo: { some: { id } } } }),

    likes: ({ id }) => client.like.count({ where: { photoId: id } }),

    commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),

    comments: ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: {
          user: true,
        },
      }),

    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },

    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },

  Hashtag: {
    photo: ({ id }, { page }) => {
      
      return client.hashtag.findUnique({ where: { id } }).photo({
        take: 5,
        skip: page ? 1 : 0,
        ...(page && { cursor: { id: page } }),
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};
