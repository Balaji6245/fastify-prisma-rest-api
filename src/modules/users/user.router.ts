import { FastifyInstance, UserController, $ref } from "../../utils/path";

async function UserRoutes(server: FastifyInstance) {

    server.post('/register', {
        // schema: {
        //     body: $ref('userSchema'),
        //     response: {
        //         201: $ref('userSchemaResponse')
        //     }
        // },
    }, UserController.UserRegisterHandler);

    server.post('/login', {
        // schema: {
        //     body: $ref('loginSchema'),
        //     response: {
        //         200: $ref('loginSchemaResponse')
        //     }
        // }
    }, UserController.UserLogin);

    server.get('/list', {
        preHandler: [server.authenticate]
    }, UserController.UserList);

    server.get('/', {
        preHandler: [server.authenticate]
    }, UserController.UserDetail);

    server.patch('/', {
        preHandler: [server.authenticate],
        // schema: {
        //     body: $ref('updateSchema'),
        //     response: {
        //         200: $ref('updateSchemResponse')
        //     }
        // }
    }, UserController.UpdateUserProfile);

    server.delete('/', {
        preHandler: [server.authenticate]
    }, UserController.deleteUserProfile)
}

export default UserRoutes;