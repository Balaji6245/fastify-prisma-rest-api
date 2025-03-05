import Fastify from 'fastify';
import UserAuthRoutes, { UserSchema, jwt, FastifyRequest, FastifyReply } from './utils/path';
import { env } from 'process';

export const server = Fastify();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any
    }
}

//Check server working or not
server.get('/', async () => {
    return { status: "Fastify server running perfectly....." }
});

// Register jwt in fastify server
server.register(jwt, {
    secret: process.env.AWS_SECRET!
});

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (error) {
        reply.send(error)
    }
})

// Main fn to run a server
async function main() {
    try {

        for (const schema of UserSchema) {
            server.addSchema(schema);
        }

        server.register(UserAuthRoutes, { prefix: 'api/v1/user' })

        let port: number = 8080;

        server.listen({ port });
        console.log(`Server ready at http://localhost:${port}`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main()