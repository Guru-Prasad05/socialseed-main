const client = require("../../client");
const { protectedResolvers } = require("../../users/users.utils");
const  uploadPhoto  = require("../../shared/shared.utils");

const  processHashtag  = require("../photos.utils");
module.exports= {
  Mutation: {
    uploadPhoto: protectedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          //parse caption
          hashtagObjs = processHashtag(caption);
          //get or create hashtag
        }
        
        const fileUrl = await uploadPhoto(file, loggedInUser.id, "upload");
        console.log(fileUrl)
        const result = await client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        });
        return result;
        //save the photo With the parsed Hashtag
        //add the photo to the hashtags
      }
    ),
  },
};
