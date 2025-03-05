import { Prisma, CreateUserInput, hashPassword, UserUpdateInput } from '../../utils/path';

class serviceClass {
    createUser = async function (input: CreateUserInput) {
        let encrptPassword = hashPassword(input.password);
        input['password'] = encrptPassword;

        const user = await Prisma.user.create({
            data: input,
            select: {
                name: true,
                email: true,
                id: true
            }
        });
        return user;
    }

    findUserByPassEmail = async function (email: string, password: string) {
        return Prisma.user.findUnique({
            where: {
                email, password
            }
        })
    }

    findAllUsers = async function () {
        return Prisma.user.findMany({
            select: {
                email: true,
                name: true,
                id: true
            }
        })
    }

    findUser = async function (id: number) {
        return Prisma.user.findFirst({
            where: { id }
        })
    }

    updateSingleUser = async function (id: number, data: UserUpdateInput) {
        return Prisma.user.update({
            where: { id },
            data
        });
    }

    checkUserEmail = async (userId: any, email: string) => {
        let query = userId ? { id: { not: userId }, email } : { email }
        return Prisma.user.findFirst({
            where: query
        })
    }

    deleteSingleUser = async (id: number) => {
        return Prisma.user.delete({
            where: { id }
        })
    }
}

export const UserService = new serviceClass();
