import Fastify from 'fastify';
import UserRoutes from './utils/path';

const server = Fastify();

server.get('/', async () => {
    return { status: "Fastify server running perfectly....." }
})

async function main() {
    try {

        server.register(UserRoutes, { prefix: 'api/v1/user' })

        let port: number = 8080;

        server.listen({ port });
        console.log(`Server ready at http://localhost:${port}`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main()