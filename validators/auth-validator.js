const { z } = require('zod');

const signupSchema = z.object({
  username: z
    .string({required_error: 'Name is required'})
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(255, { message: 'Username must be at most 20 characters long' }),
  email: z
    .string({required_error: 'Email is required'})
    .trim()
    .email({ message: 'Invalid email address' })
    .min(3, { message: 'Email must be at least 3 characters long' })
    .max(255, { message: 'Email must be at most 255 characters long' }),
  phone: z
    .string({required_error: 'Phone number is required'})
    .trim()
    .min(10, { message: 'Phone number must be at least 11 characters long' })
    .max(15, { message: 'Phone number must be at most 15 characters long' }),
  password: z
    .string({required_error: 'Password is required'})
    .min(7, { message: 'Password must be at least 7 characters long' })
    .max(1024, { message: 'Password must be at most 1024 characters long' }),
});

module.exports = { signupSchema };