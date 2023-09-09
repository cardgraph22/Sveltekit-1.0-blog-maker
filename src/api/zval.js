import { z } from 'zod'
//console.log('zval called')
const loginSchema = z.object({
  username: z
    .string( {required_error: 'User name is required'})
    .min( 1, { message: 'User name must be at least one character'})
    .max(64, { message: 'User name must be less than 64 characters'})
    .trim(),
  password: z
    .string( {required_error: 'Password is required'})
    .min( 3, { message: 'Password must be at least 3 characters'})
    .max(32, { message: 'Password must be less than 32 characters'})
    .trim()
    //email: z.string().min(1).max(64).email()
    // email trims ie trim()  by default
  })

  const newUserSchema = z.object({
    username: z
      .string( {required_error: 'User name is required'})
      .min( 1, { message: 'User name must be at least one character'})
      .max(64, { message: 'User name must be less than 64 characters'})
      .trim(),
    password: z
      .string( {required_error: 'Password is required'})
      .min( 3, { message: 'Password must be at least 3 characters'})
      .max(32, { message: 'Password must be less than 32 characters'})
      .trim(),
    confPwd: z
      .string( {required_error: 'Password is required'})
      .min( 3, { message: 'Password must be at least 3 characters'})
      .max(32, { message: 'Password must be less than 32 characters'})
      .trim(),
    //filename: z
    //  .string()  //
    }).superRefine(({confPwd, password}, ctx) => {
      if(confPwd !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password must match',
          path: ['password']
        })
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password must match',
          path: ['confPwd']
        })
      }
    })

    export { loginSchema, newUserSchema }