import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsSort', async: false })
export class IsValueSort implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string, _: ValidationArguments) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, type] = value.split('.');

      if (type !== 'asc' && type !== 'desc') return false;

      return true;
    } catch {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'Invalid sort param, sent [field].[asc or desc]';
  }
}

export function IsSort() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsSort',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueSort,
    });
  };
}
