import { FastifyReply } from './path';

class ResponderClass {
    sendSuccessMessage = (message: string, code: number, reply: FastifyReply) => {
        let result = { success: true, message }
        reply.code(code).send(result)
    }

    sendSuccessData = (data: any, message: string, code: number, reply: FastifyReply) => {
        let result = { success: true, message, data }
        reply.code(code).send(result)
    }

    sendFailureMessage = (message: string, code: number, reply: FastifyReply) => {
        let result = { success: false, message }
        reply.code(code).send(result)
    }
}

export const Responder = new ResponderClass();