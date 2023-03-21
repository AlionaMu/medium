import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from "src/app/auth/store/selectors";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

@Component({
  selector: 'mc-topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean | null> = {} as Observable<boolean>
  public isAnonymous$: Observable<boolean> = {} as Observable<boolean>
  public currentUser$: Observable<CurrentUserInterface | null> = {} as Observable<CurrentUserInterface>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }
}
