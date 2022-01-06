import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { omit } from 'lodash';

const formatError: (error: GraphQLError) => GraphQLFormattedError = (err) => {
  const extensions = err.extensions as any;
  return {
    statusCode: extensions?.exception.status,
    code: extensions?.exception.code,
    message: err.message || extensions?.exception.code,
    path: err.path,
    extensions: omit(extensions, ['exception', 'code'])
  };
};

export default formatError;
