const client = require("../../client");
const { protectedResolvers } = require("../../users/users.utils");
const uploadPhoto = require("../../shared/shared.utils");
const fs= require("fs")

const processHashtag = require("../photos.utils");
const { GraphQLUpload } = require("apollo-server-express");




module.exports = {
  Upload:GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          //parse caption
          hashtagObjs = processHashtag(caption);
          //get or create hashtag
        }
        
        const { createReadStream, filename} = await file.file;
        
        const fileUrl = await uploadPhoto(
          createReadStream,
          loggedInUser.id,
          "upload",
          filename
        );
        

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


