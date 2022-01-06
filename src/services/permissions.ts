import Unauthorized from '@shared/error/Unauthorized';
import jwt, { config } from '@shared/jwt';
import { GraphQLContext, Payload } from '@type';
import { rule, shield } from 'graphql-shield';
import { pick } from 'lodash';

const authorization = rule()(async (_, __, ctx: GraphQLContext) => {
    try {
        const authHeader = ctx.req.get('Authorization');
        if (!authHeader) {
            return new Unauthorized();
        }
        const accessToken = authHeader.split(' ')[1];
        const payload = jwt.verify(accessToken, config.secretKey);
        console.log("payload: ", payload)
        const newPayload = pick(payload, ['id', 'type']) as Payload;
        ctx.auth = newPayload;
        return true;
    } catch (error) {
        return new Unauthorized();
    }
});

const permissions = shield(
    {
        Query: {
            users: authorization
        }
    },
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fallbackError: (err: any) => {
            return err;
        }
    }
);

export default permissions;
