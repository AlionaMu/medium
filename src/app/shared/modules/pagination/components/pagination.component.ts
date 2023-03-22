import { Component, Input, OnInit } from "@angular/core";
import { UtilsService } from "src/app/shared/services/utils.service";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number | undefined = 0
  @Input('limit') limitProps: number = 0
  @Input('currentPage') currentPageProps: number = 0
  @Input('url') urlProps: string | undefined = ''

  pagesCount: number = 0
  pages: number[] = []

  constructor(private utilsService: UtilsService){}

  ngOnInit() {
    if(this.totalProps)
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
    this.pages = this.utilsService.range(1, this.pagesCount)
  }
}
