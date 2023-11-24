import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent {
  @Input() ponyModel!: PonyModel;
  @Output() ponyClicked = new EventEmitter<PonyModel>();
  getPonyImageUrl(): string {
    switch (this.ponyModel.color) {
      case 'PURPLE':
        return 'assets/images/pony-purple.gif';

      case 'BLUE':
        return 'assets/images/pony-blue.gif';

      case 'YELLOW':
        return 'assets/images/pony-yellow.gif';

      case 'GREEN':
        return 'assets/images/pony-green.gif';

      case 'ORANGE':
        return 'assets/images/pony-blue.gif';

      default:
        return '';
    }
  }
  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
