import { z, CommonMsg } from '../../utils/path';

const userSchema = z.object({
    email: z.string({
        required_error: CommonMsg.emailVaild,
        invalid_type_error: CommonMsg.invalidEmailType
    }).email(),
    name: z.string(),
    password: z.string({
        required_error: CommonMsg.passwordVaild,
        invalid_type_error: CommonMsg.invalidPasswordType
    })
});

export type CreateUserInput = z.infer<typeof userSchema>