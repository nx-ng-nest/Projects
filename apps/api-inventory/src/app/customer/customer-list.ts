import { CustomerDTO } from './customer.dto';

export function customerList(): CustomerDTO[] {
  return [
    {
      email: 'ab@gmail.com',
      firstName: 'ab',
      lastName: 'cd',
      phone: '+1 999 985 5566',
    },
    {
      email: 'ef@gmail.com',
      firstName: 'ef',
      lastName: 'gh',
      phone: '+1 999 333 5566',
    },
  ];
}
