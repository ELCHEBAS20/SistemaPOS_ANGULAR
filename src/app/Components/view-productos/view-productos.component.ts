import { Component, OnInit } from '@angular/core';
import { AppConsumo } from '../../Config/Services/Consumo.component'

@Component({
  selector: 'app-view-productos',
  templateUrl: './view-productos.component.html',
  styleUrls: ['./view-productos.component.css']
})
export class ViewProductosComponent implements OnInit {

  constructor(public appConsumo: AppConsumo) { }


  ngOnInit(): void {
    this.function_Get_Listar();
  }

  public function_Get_Listar(): void {
    this.appConsumo.function_GET_LISTAR('Productos').subscribe((resp: any) => {
      console.log(resp);
    })
  }






}
