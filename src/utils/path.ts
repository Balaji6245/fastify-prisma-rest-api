export { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
export { PrismaClient } from '@prisma/client';
export { z } from 'zod';
export * as crypto from 'crypto';
export { hashPassword, jwtVerify } from './utils';
export { buildJsonSchemas } from 'fastify-zod';
export { status } from 'http-status'

import fjwt from '@fastify/jwt';
export const jwt = fjwt;

import prisma from './prisma';
export const Prisma = prisma;

import UserRoutes from '../modules/users/user.router';
export default UserRoutes;

export { UserController } from '../modules/users/user.controller';

export { CommonMsg, UserMsg } from './message';
export { CreateUserInput, UserSchema, $ref, LoginUserInput, UserUpdateInput } from '../modules/users/user.schema';

export { UserService } from '../modules/users/user.service';

export { server } from '../app';
export { Responder } from './responder';