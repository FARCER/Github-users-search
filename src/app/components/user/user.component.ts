import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {publish} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  @Output() removeUser = new EventEmitter<boolean>();

  @Input() user: UserModel;

  public close() {
    this.removeUser.emit(false);
  }

}
