import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CommonInput from '../../components/CommonInput';
import CommonButton from '../../components/CommonButton';
import { signupSchema, type SignupFormValues } from '../../validators/authValidator';
import { toFormikValidationSchema } from '../../lib/formikHelper';

const Signup: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialValues: SignupFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitError(null);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      console.log('Signup values:', values);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setSubmitError('An error occurred during signup. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 card">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Create Account
        </h1>
        <p className="text-text-secondary text-sm">
          Join us today! Fill in your details to get started
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
          <p className="text-green-800 dark:text-green-200 text-sm text-center">
            ✓ Account created successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm text-center">
            {submitError}
          </p>
        </div>
      )}

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validate={toFormikValidationSchema(signupSchema).validate}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CommonInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName ? errors.firstName : undefined}
                />
              </div>
              <div>
                <CommonInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName ? errors.lastName : undefined}
                />
              </div>
            </div>

            {/* Email */}
            <CommonInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
              helperText="We'll never share your email with anyone"
            />

            {/* Password */}
            <CommonInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : undefined}
              helperText="Min 8 characters, include uppercase, lowercase & number"
            />

            {/* Confirm Password */}
            <CommonInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword ? errors.confirmPassword : undefined}
            />

            {/* Submit Button */}
            <CommonButton
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </CommonButton>
          </Form>
        )}
      </Formik>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-text-secondary text-sm">
          Already have an account?{' '}
          <a href="#" className="link font-medium">
            Sign In
          </a>
        </p>
      </div>

      {/* Terms & Privacy */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-text-secondary text-xs text-center">
          By signing up, you agree to our{' '}
          <a href="#" className="link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
