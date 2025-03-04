export { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
export { PrismaClient } from '@prisma/client';
export { z } from 'zod';
export * as crypto from 'crypto';
export { hashPassword } from './utils'

import prisma from './prisma';
export const Prisma = prisma;

import UserRoutes from '../modules/users/user.router';
export default UserRoutes;

export { UserRegisterHandler } from '../modules/users/user.controller';

export { CommonMsg } from './message';
export { CreateUserInput } from '../modules/users/user.schema';

export { createUser } from '../modules/users/user.service'