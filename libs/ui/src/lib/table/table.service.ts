import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TableService {
  setColumn<T = any>(columns: (keyof T)[]) {}
  setDisplayedColumns<T = any>(columns: (keyof T)[]) {}
  setPageNumber() {}
  saveView() {}
}
