import {
  ICategory,
  IFeature,
  ISale,
  IStore,
  IUser,
} from '@projects/interface';

type LocalType<T> = {
  key: string;
} & { key: string; value: T };

export class LocalStoreService {
  private constructor() {}

  private static local<T>(options: LocalType<T>) {
    if (options.value) {
      localStorage.setItem(options.key, JSON.stringify(options.value || '[]'));
      return;
    } else {
      const items = localStorage.getItem(options.key);

      const jitems = JSON.parse(items || '[]');
      jitems.map(console.log);
      return jitems;
    }
  }

  static products(value?: ICategory[]): ICategory[] {
    return this.local({ key: 'products', value: value });
  }
  static categories(value?: ICategory[]): ICategory[] {
    return this.local({ key: 'categories', value: value });
  }

  static features(value?: IFeature[]): IFeature[] {
    return this.local({ key: 'features', value });
  }

  static users(value?: IUser[]): IUser[] {
    return this.local({ key: 'users', value });
  }
  static stores(value?: IStore[]): IStore[] {
    return this.local({ key: 'stores', value });
  }

  static sales(value?: ISale[]): ISale[] {
    return this.local({ key: 'sales', value });
  }
}
