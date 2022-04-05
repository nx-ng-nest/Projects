import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'projects-product-toolbar',
  templateUrl: './product-toolbar.component.html',
  styleUrls: ['./product-toolbar.component.scss'],
})
export class ProductToolbarComponent implements OnInit {
  @Input() title = 'Product';
  constructor() {}

  ngOnInit(): void {}
}
