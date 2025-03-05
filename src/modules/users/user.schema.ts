import { z, CommonMsg, buildJsonSchemas } from '../../utils/path';

const userCore = {
    email: z.string({
        required_error: CommonMsg.emailVaild,
        invalid_type_error: CommonMsg.invalidEmailType
    }).email(),
    name: z.string(),
}

const userSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: CommonMsg.passwordVaild,
        invalid_type_error: CommonMsg.invalidPasswordType
    })
});

const userSchemaResponse = z.object({
    id: z.number(),
    ...userCore,
})

const loginSchema = z.object({
    email: z.string({
        required_error: CommonMsg.emailVaild,
        invalid_type_error: CommonMsg.invalidEmailType
    }).email(),
    password: z.string()
})

const loginSchemaResponse = z.object({
    accessToken: z.string()
})

const updateSchemResponse = z.object({
    id:z.number(),
    ...userCore
})

const updateSchema = z.object({
    ...userCore
})

export type CreateUserInput = z.infer<typeof userSchema>
export type LoginUserInput = z.infer<typeof loginSchema>
export type UserUpdateInput = z.infer<typeof updateSchema>

export const { schemas: UserSchema, $ref } = buildJsonSchemas({
    userSchema,
    userSchemaResponse,
    loginSchema,
    loginSchemaResponse,
    updateSchemResponse,
    updateSchema
});