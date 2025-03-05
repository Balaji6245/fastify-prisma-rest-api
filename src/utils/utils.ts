import { crypto, FastifyRequest, server } from "./path";

export function hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
}

export function jwtVerify(request: FastifyRequest) {
    let token: string = "";

    if (request?.headers?.authorization && request?.headers?.authorization.startsWith("Bearer"))
        token = request?.headers?.authorization.split(' ')[1];

    const verifyToken: any = server.jwt.verify(token);
    return verifyToken;
}