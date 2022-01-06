import BaseError from '.';
import HttpStatus from 'http-status-codes';

export default class Unauthorized extends BaseError {
  public code = 'UNAUTHORIZED';
  public status = HttpStatus.UNAUTHORIZED;
}
