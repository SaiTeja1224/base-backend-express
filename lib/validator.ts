import type { z } from "zod";
/**
 * Validates the provided data using a Zod validator, with support for both synchronous and asynchronous validation.
 *
 * @template T - The Zod schema type used for validation.
 * @template O - The expected output type after validation.
 * @template I - The input type expected by the validator.
 * @param {z.ZodEffects<T, O, I> | z.ZodType<O, z.ZodTypeDef, I>} validator - The Zod validator or Zod schema to use for validation.
 * @param {unknown} data - The data to validate.
 * @param {Object} [options={}] - Options for the validation process.
 * @param {boolean} [options.async=false] - If true, performs asynchronous validation. Defaults to false.
 * @returns {Promise<{ success: true, data: O } | { success: false, message: string, errors: Record<string, string[]> }>}
 *  A promise that resolves to an object indicating whether the validation was successful.
 *  - If successful, the object contains the validated data.
 *  - If unsuccessful, the object contains a message and a record of validation errors, where each key is the field name, and the value is an array of error messages.
 */
const validate = async <T extends z.ZodTypeAny, O, I>(
  validator: z.ZodEffects<T, O, I> | z.ZodType<O, z.ZodTypeDef, I>,
  data: unknown,
  { async } = { async: false }
) => {
  let result;
  if (async) {
    result = await validator.safeParseAsync(data);
  } else {
    result = validator.safeParse(data);
  }
  if (!result.success) {
    // Handle validation errors
    console.error("Validation failed:", result.error.message);
    return {
      success: false as const,
      message: `Validation failed`,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return {
    success: true as const,
    data: result.data,
  };
};

export default validate;
