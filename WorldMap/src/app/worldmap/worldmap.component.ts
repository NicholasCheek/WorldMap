import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements AfterViewInit {
  @ViewChild('svg', { static: false }) svg!: ElementRef;
  selectedCountry: any = {};

  constructor(private infoService: InfoService, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.addMouseoverListener();
  }

  addMouseoverListener() {
    this.renderer.listen(this.svg.nativeElement, 'mouseover', (event) => {
      if (event.target && event.target instanceof SVGPathElement) {
        const countryCode = event.target.getAttribute('id');
        this.onCountryMouseOver(countryCode);
      }
    });
  }

  onCountryMouseOver(countryCode: string): void {
    this.infoService.getInfo(countryCode).subscribe((data) => {
      this.selectedCountry = {
        name: data[1][0].name,
        capital: data[1][0].capitalCity,
        region: data[1][0].region.value,
        incomeLevel: data[1][0].incomeLevel.value,
        latitude: data[1][0].latitude,
        longitude: data[1][0].longitude
      };
    });
  }
}
