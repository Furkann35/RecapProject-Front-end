import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  filterColor: "";
  constructor(private colorService: ColorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   if (params["colorId"]) {
    //     this.getColorsByCar(params["colorId"])
    //   } else {
    this.getColors()
    //   }
    // })
  }

  getColors() {
    this.colorService.getColors().subscribe((response => {
      this.colors = response.data
    }))
  }


  getColorsByCar(colorId: number) {
    this.colorService.getColorsByCar(colorId).subscribe((response => {
      this.colors = response.data
    }))
  }


  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }
}
