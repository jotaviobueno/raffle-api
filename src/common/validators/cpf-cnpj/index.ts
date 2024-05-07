import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { CNPJUtil, CPFUtil } from 'src/common/utils';

@ValidatorConstraint({ name: 'IsCpfCnpj', async: false })
export class IsValueCpfCnpj implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: string, _: ValidationArguments) {
    try {
      const cpf = new CPFUtil();
      const cnpj = new CNPJUtil();
      const regex =
        /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

      if (regex.test(value)) {
        const cpfStrip = cpf.strip(value);
        const isCpfValid = cpf.isValid(cpfStrip);
        const isValidCpf = cpf.verifierDigit(cpfStrip);

        const cnpjStrip = cnpj.strip(value);
        const cnpjValid = cnpj.isValid(cnpjStrip);

        if ((isValidCpf === 0 && isCpfValid) || cnpjValid) return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'invalid document sent cpf or cnpj';
  }
}

export function IsCpfCnpj() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCpfCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueCpfCnpj,
    });
  };
}
