
import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
