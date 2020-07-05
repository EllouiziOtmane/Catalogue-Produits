import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits: any;
  public size:number=6;
  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;

  constructor(private catService:CatalogueService) { }

  ngOnInit(): void {
  }

  onGetProducts() {
  this.catService.getProducts(this.currentPage, this.size)
    .subscribe(data=> {
      this.totalPages=data["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.produits=data;
      },err=>{
      console.log(err);
      } );
  }

  onDeleteProduct(p) {
    let conf=confirm("Etes vous sûre?");
    if (conf) {
      this.catService.deleteRessource(p._links.self.href)
        .subscribe(data => {
          this.onGetProducts();
          }, err=>{
          console.log(err);
          }
        )
    }
  }

  onChercher(value: any) {
    console.log(value);
  }

  onPageProduct(i) {
    this.currentPage=i;
    this.onGetProducts();
  }
}
