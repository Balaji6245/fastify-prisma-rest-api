import { Prisma, CreateUserInput, hashPassword } from '../../utils/path'

export async function createUser(input: CreateUserInput) {
    let encrptPassword = hashPassword(input.password);

    const user = await Prisma.user.create({
        data: { ...input, password: encrptPassword }
    });
    return user;
}