import { Injectable } from '@angular/core';
import {
  ADD_GENRE,
  BLOCK_GENRE,
  MODIFY_GENRE,
} from '@graphql/operations/mutations/genre';
import { ApiService } from '@graphql/service/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class GenresService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }
  add(genre: string) {
    return this.set(
      ADD_GENRE,
      {
        genre,
        // variables: { genre },
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.addGenre;
      })
    );
  }

  update(id: string, genre: string) {
    return this.set(
      MODIFY_GENRE,
      {
        id,
        genre,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.updateGenre;
      })
    );
  }

  block(id: string) {
    return this.set(
      BLOCK_GENRE,
      {
        id,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.blockGenre;
      })
    );
  }
}
