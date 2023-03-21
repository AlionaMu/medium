import { LoadingModule } from './../errorMessage copy/loading.module';
import { RouterModule } from '@angular/router';
import { FeedService } from './services/feed.service';
import { StoreModule } from '@ngrx/store';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FeedComponent } from "./components/feed/feed.component";
import { reducers } from './store/reducers';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule
  ],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}
