import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, AppUpState } from '../../app-store';
import { actions } from '../../app-store.actions';
import { ProductService } from '../product.service';

@Component({
  selector: 'projects-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  idControl = new FormControl({ value: '', disabled: true });
  nameControl = new FormControl('');
  descriptionControl = new FormControl('');

  formGroup = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    description: this.descriptionControl,
  });

  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    private store: Store<AppUpState>
  ) {}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParamMap;

    this.idControl.setValue(queryParams.get('id'));
    this.nameControl.setValue(queryParams.get('name'));
    this.descriptionControl.setValue(queryParams.get('description'));
    this.activatedRoute.params.subscribe((data) => {
      document.title = `View Product ${data['id']}`;
    });
    this.store.dispatch(
      actions.SET_CURRENT_PAGE({
        currentPage: `Edit Product ${queryParams.get('id')}`,
      })
    );
  }
}
