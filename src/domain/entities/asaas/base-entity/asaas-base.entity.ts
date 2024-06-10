export class AsaasBaseEntity<T> {
  object: 'payment' | 'subscription' | 'sub-account' | 'customer' | 'event';
  data: T;
}
