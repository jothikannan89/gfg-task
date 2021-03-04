import { GraphQLScalarType, Kind } from "graphql";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value); // ast value is always in string format
    }
    else if (ast.kind == Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default DateScalar;
