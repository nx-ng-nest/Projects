import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'projects-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  products: {
    id: number;
    name: string;
    description: string;
  }[] = [];
  constructor(private httpService: HttpClient) {}

  ngOnInit(): void {
    this.httpService.get('/api/products').subscribe((data) => {
      console.log(data);
      this.products = data as any;
    });
  }
}
