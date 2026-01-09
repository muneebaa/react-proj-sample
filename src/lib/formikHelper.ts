import { z } from 'zod';

/**
 * Converts Zod validation errors to Formik-compatible error format
 */
export function toFormikValidationSchema<T>(schema: z.ZodSchema<T>) {
  return {
    validate: (values: T) => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.issues.forEach((issue) => {
            const path = issue.path.join('.');
            errors[path] = issue.message;
          });
          return errors;
        }
        return {};
      }
    },
  };
}

