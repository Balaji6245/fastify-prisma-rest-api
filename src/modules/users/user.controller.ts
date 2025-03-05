import { FastifyRequest, FastifyReply, CreateUserInput, LoginUserInput, UserMsg, server, hashPassword, jwtVerify, UserUpdateInput, status, Responder, UserService } from '../../utils/path';

class Controller {

    // User regsiter api
    UserRegisterHandler = async function (
        request: FastifyRequest<{ Body: CreateUserInput }>,
        reply: FastifyReply) {

        let data = request.body;

        //check email already exsist or not
        let checkUser = await UserService.checkUserEmail(null, data?.email);
        if (checkUser) return Responder.sendFailureMessage(UserMsg.emailValid404, status.BAD_REQUEST, reply);

        let user = await UserService.createUser(data);
        Responder.sendSuccessData({ user }, UserMsg.register, status.CREATED, reply);

        Responder.sendFailureMessage(UserMsg.register404, status.BAD_REQUEST, reply);
    }

    //User login api
    UserLogin = async function (request: FastifyRequest<{
        Body: LoginUserInput
    }>, reply: FastifyReply) {

        const data = request.body;

        //Find user by email and password

        let encrptPassword = hashPassword(data?.password);

        const user = await UserService.findUserByPassEmail(data?.email, encrptPassword);
        if (!user) return Responder.sendFailureMessage(UserMsg.invalidEmailPass, status.BAD_REQUEST, reply);

        const { password, ...rest } = user

        Responder.sendSuccessData({ accessToken: server.jwt.sign(rest) }, UserMsg.login, status.OK, reply);
    }

    //User list api
    UserList = async function (request: FastifyRequest, reply: FastifyReply) {
        const users = await UserService.findAllUsers();

        if (users) Responder.sendSuccessData({ users }, UserMsg.userList, status.OK, reply);
        else Responder.sendFailureMessage(UserMsg.userList404, status.NOT_FOUND, reply);
    }

    //User Detail api
    UserDetail = async function (request: FastifyRequest, reply: FastifyReply) {
        let verifyToken: any = jwtVerify(request);
        const user = await UserService.findUser(parseInt(verifyToken.id));

        if (user) Responder.sendSuccessData(user, UserMsg.userDetail, status.OK, reply)
        else Responder.sendFailureMessage(UserMsg.userDetail404, status.NOT_FOUND, reply)
    }

    //Update user profile api
    UpdateUserProfile = async function (request: FastifyRequest<{
        Body: UserUpdateInput
    }>, reply: FastifyReply) {

        let data = request?.body;

        let verifyToken: any = jwtVerify(request);
        const user: any = await UserService.findUser(parseInt(verifyToken.id));

        //check email already exsist or not
        let checkUser = await UserService.checkUserEmail(user?.id, data?.email);
        if (checkUser) return Responder.sendFailureMessage(UserMsg.emailValid404, status.BAD_REQUEST, reply);

        let updateUser = await UserService.updateSingleUser(user?.id, data);

        if (updateUser) Responder.sendSuccessData({ user: updateUser }, UserMsg.update, status.OK, reply);
        else Responder.sendFailureMessage(UserMsg.update404, status.NOT_MODIFIED, reply);
    }

    deleteUserProfile = async (request: FastifyRequest, reply: FastifyReply) => {

        let verifyToken: any = jwtVerify(request);
        const user: any = await UserService.findUser(parseInt(verifyToken.id));

        const deleteUser = await UserService.deleteSingleUser(user?.id);
        if (deleteUser) Responder.sendSuccessMessage(UserMsg.deleteUser, status.OK, reply);
        else Responder.sendFailureMessage(UserMsg.deleteUser404, status.NOT_MODIFIED, reply)
    }
}

export const UserController = new Controller();
