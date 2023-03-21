import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { Observable } from 'rxjs';
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input('apiUrl') apiUrlProps: string = ''

  isLoading$: Observable<boolean> = {} as Observable<boolean>
  error$: Observable<string | null> = {} as Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>  = {} as Observable<GetFeedResponseInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
  }

  fetchData() {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }
}
