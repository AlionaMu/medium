import { environment } from './../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { HttpClient } from '@angular/common/http';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {

  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'

    return this.http.get(url).pipe(map((response: GetPopularTagsResponseInterface | any) =>  {
      return response.tags
    }
    ))
  }
}
