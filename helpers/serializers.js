exports.serializeUser = async (data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation
  }
};
