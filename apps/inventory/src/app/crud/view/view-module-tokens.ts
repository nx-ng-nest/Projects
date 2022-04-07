import { Inject } from '@angular/core';

export enum ViweModuleTokens {
  NAME = 'ViweModuleTokens.NAME',
}

export function InjectViewName() {
  return Inject(ViweModuleTokens.NAME);
}
