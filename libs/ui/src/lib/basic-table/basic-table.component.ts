import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'projects-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css'],
})
export class BasicTableComponent implements OnInit {
  @Input() dataSource!: Record<string, any>[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns!: string[];

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.dataSource[0]);
  }
}
