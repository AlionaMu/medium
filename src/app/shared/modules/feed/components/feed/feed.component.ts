import { environment } from './../../../../../../environments/environment';
import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { Observable, Subscription } from 'rxjs';
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors';
import { ActivatedRoute, Params, Router } from '@angular/router';

import queryString from 'query-string';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string = ''

  isLoading$: Observable<boolean> = {} as Observable<boolean>
  error$: Observable<string | null> = {} as Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>  = {} as Observable<GetFeedResponseInterface | null>

  limit = environment.limit
  baseUrl: string | undefined;
  queryParamsSubscription: Subscription = {} as Subscription
  currentPage: number = 1

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || 1)
      this.fetchFeed()
    })
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))

    this.baseUrl = this.router.url.split('?')[0]
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl =  queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }
}
