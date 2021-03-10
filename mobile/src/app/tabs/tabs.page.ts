import { Component, OnInit } from '@angular/core';
import {InterfaceService} from "../services/interface/interface.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public isAdmin = false;
  constructor(private interfaceService: InterfaceService) { }

  ngOnInit() {
    this.isAdmin = this.interfaceService.isAdmin();
  }

}
