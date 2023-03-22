import { PopularTagsModule } from './../shared/modules/popularTags/popularTags.module';
import { BannerModule } from './../shared/modules/banner/banner.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GlobalFeedComponent } from "./components/globalFeed/globalFeed.component";
import { FeedModule } from '../shared/modules/feed/feed.module';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
]

@NgModule({
  declarations: [
    GlobalFeedComponent
  ],
  imports: [
    CommonModule,
    FeedModule,
    RouterModule.forChild(routes),
    BannerModule,
    PopularTagsModule
  ]
})
export class GlobalFeedModule {}
