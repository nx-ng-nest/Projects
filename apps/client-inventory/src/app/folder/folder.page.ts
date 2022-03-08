import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'projects-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.httpClient.get('api/hello').subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.folder = id;
    }
  }
}
