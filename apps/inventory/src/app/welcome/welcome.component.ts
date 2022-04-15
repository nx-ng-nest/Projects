import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'projects-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  electron!: any;
  modules!: string[];
  version!: string;
  platform!: string;

  printers!: string[];

  constructor() {}

  async ngOnInit() {
    this.electron = (<any>window).electron;
    this.modules = Object.keys(this.electron);
    this.version = await this.electron.getAppVersion();
    this.platform = this.electron.platform;

    this.printers = Object.values(await this.electron.printers());
  }

   printPage() {
     this.electron.printPage();
  }
}
