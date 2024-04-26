export class EmailAlreadyInUserError extends Error {
  constructor(email) {
    super(`the e-mail ${email} is already in use.`);
    this.name = 'EmailAlreadyInUserError';
  }
}