import { FastifyRequest, FastifyReply, createUser, CreateUserInput } from '../../utils/path';

export async function UserRegisterHandler(
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply) {

    let data = request.body;

    try {
        let user = await createUser(data);
        reply.code(200).send(user);
    } catch (error) {
        reply.code(400).send(error)
    }

}