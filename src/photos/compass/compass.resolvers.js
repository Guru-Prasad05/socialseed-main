import client from "../../client";

export default {
  Query: {
    compass: (_, { lastId }) => {
      return client.photo.findMany({
        take: 30,
        skip: lastId?1:0,
        ...(lastId && {cursor: { id: lastId }}),
        orderBy: {
          createAt:"desc",
        },
      });
    },
  },
};
