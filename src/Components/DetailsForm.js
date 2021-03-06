import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, updateDetails, getUpdater } from "../Slices/updateSlice";
import Styles from "../styles/DetailsFormStyle";
import { Form, Field } from "react-final-form";

const DetailsForm = () => {
  const dispatch = useDispatch();

  const required = (value) => (value ? undefined : "*Required");
  const userNameLength = (value) =>
    value.length < 32 ? undefined : "user name is too long";
  const phoneLength = (value) =>
    value.length <= 10 ? undefined : "phone number is too long";
  const mustBeNumber = (value) =>
    isNaN(value) ? "Must be a number" : undefined;

  const ValidPassword = (value) => {
    var reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,12}$/;
    if (reg.test(value) === false) {
      return "invalid password";
    }
    return undefined;
  };

  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
  useEffect(() => {
    dispatch(clear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    dispatch(getUpdater(values)).then(() => {
      dispatch(
        updateDetails({
          name: values.userName,
          phone: values.phoneNumber,
        })
      );
    });
  };

  return (
    <Styles>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};

          if (values.ConfirmPassword !== values.Password) {
            errors.ConfirmPassword = "different passwords";
          }
          return errors;
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>User Name</label>
              <Field
                name="userName"
                validate={composeValidators(required, userNameLength)}
              >
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="User Name" />
                    <div>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div>
              <label>Phone Number</label>

              <Field
                name="phoneNumber"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  phoneLength
                )}
              >
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" placeholder="Phone Number" />
                    <div>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div>
              <label>Password</label>
              <Field name="Password" validate={ValidPassword}>
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="password" placeholder="Password" />
                    <div>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div>
              <label>Confirm Password</label>
              <Field name="ConfirmPassword">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <div>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      />
    </Styles>
  );
};
export default DetailsForm;
