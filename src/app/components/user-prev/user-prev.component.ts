import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUserSmall} from '../../interfaces/user-small.interface';

@Component({
  selector: 'app-user-prev',
  templateUrl: './user-prev.component.html',
  styleUrls: ['./user-prev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPrevComponent {
  @Input() public user: IUserSmall;
}
