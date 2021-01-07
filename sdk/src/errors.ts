export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BaseError';
  }
}

export class SpecError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'SpecError';
  }
}

export class ArtifactError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = 'ArtifactError';
  }
}
