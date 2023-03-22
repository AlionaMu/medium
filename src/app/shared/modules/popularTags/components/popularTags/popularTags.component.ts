import { errorSelector } from './../../../feed/store/selectors';
import { popularTagsSelector, isLoadingSelector } from './../../store/selectors';
import { Component, OnInit } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { Observable } from "rxjs"
import { PopularTagType } from "src/app/shared/types/popularTag.type"
import { getPopularTagsAction } from "../../store/actions/getPopularTags.action"

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html'
})
export class PopularTagsComponent implements OnInit {
  popularTags$: Observable<PopularTagType[] | null> = {} as Observable<PopularTagType[] | null>
  isLoading$: Observable<boolean> = {} as Observable<boolean>
  error$: Observable<string | null> = {} as Observable<string | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues() {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction())
  }
}
