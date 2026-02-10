export class FieldError {
  field: string = '';
  message: string = '';
}

export class Error {
  status: number = 0;
  message: string = '';
  errors?: FieldError[];
  timestamp: string = '';
}
