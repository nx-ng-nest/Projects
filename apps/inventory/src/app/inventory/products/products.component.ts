import { Component, OnInit } from '@angular/core';
import { ProductService } from '@projects/client-service';
import { TableAction } from '@projects/ui';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'projects-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  tableName!: string;
  tableViewName!: string;

  displayedColumns = ['selected', 'uuid', 'name', 'description'];
  tableActions: TableAction[] = [
    { label: 'Edit', icon: 'edit', row: {} as any, event: 'EDIT_PRODUCT' },
  ];
  columns = [
    'id',
    'createdA',
    'updatedA',
    'deletedA',
    'selected',
    'active',
    'id1',
    'id2',
    'id3',
    'uuid',
    'name',
    'description',
    'features',
    'categories',
  ];

  searchKeys = ['id', 'uuid', 'name', 'description'];

  constructor(public productService: ProductService) {}

  async ngOnInit() {
    this.tableName = 'Products';
    this.tableViewName = 'Default';
    await firstValueFrom(this.productService.getAll());
  }
}
