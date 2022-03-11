export type UserPermission = {
  [resourceName: string]: {
    [method: string]: boolean;
  };
};



