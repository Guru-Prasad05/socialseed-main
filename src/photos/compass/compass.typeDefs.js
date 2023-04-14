import { gql } from "apollo-server-express";

export default gql`
  type Query {
    compass(lastId:Int): [Photo]
  }
`;
