import { FastifyInstance, UserRegisterHandler } from "../../utils/path";

async function UserRoutes(server: FastifyInstance) {
    server.post('/register', UserRegisterHandler)
}

export default UserRoutes;