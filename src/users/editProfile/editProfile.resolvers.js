import fs from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolvers } from "../users.utils";
import { uploadPhoto } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadPhoto(avatar, loggedInUser.id, "avatars");
    // const { filename, createReadStream } = await avatar;
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = fs.createWriteStream(
    //   process.cwd() + "/upload/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let hashPassword = null;
  if (newPassword) {
    hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      email,
      username,
      bio,
      ...(hashPassword && { password: hashPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updatedUser.id) {
    return { avatar: avatarUrl, ok: true };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolvers(resolverFn),
  },
};
