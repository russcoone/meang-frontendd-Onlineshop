import { UsersService } from '@core/services/users.service';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ApiService } from '@graphql/service/api.service';
import { Apollo } from 'apollo-angular';
import { BLOCK_USER, UPDATE_USER } from '@graphql/operations/mutations/user';
import { map } from 'rxjs/internal/operators/map';
import { BLOCK_GENRE } from '@graphql/operations/mutations/genre';

@Injectable({
  providedIn: 'root',
})
export class UsersAdminService extends ApiService {
  constructor(private UsersService: UsersService, apollo: Apollo) {
    super(apollo);
  }
  register(user: IRegisterForm) {
    return this.UsersService.register(user);
  }
  update(user: IRegisterForm) {
    return this.set(UPDATE_USER, {
      user,
      include: false,
    }).pipe(
      map((result: any) => {
        return result.updateUser;
      })
    );
  }

  block(id: string) {
    return this.set(BLOCK_USER, {
      id,
    }).pipe(
      map((result: any) => {
        return result.blockUser;
      })
    );
  }
}
