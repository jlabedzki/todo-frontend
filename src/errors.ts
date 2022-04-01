export class BackendError extends Error {
  constructor(message?: string) {
    super(message || "There was a problem with the backend");
    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message || "Could not authenticate request");
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
