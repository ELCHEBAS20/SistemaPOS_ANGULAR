import { Component, OnInit } from '@angular/core';
import { AppConsumo } from '../../Config/Services/Consumo.component'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(public appConsumo: AppConsumo) { }


  ngOnInit(): void {
    this.function_Get_Listar();
  }

  public function_Get_Listar(): void {
    this.appConsumo.function_GET_LISTAR('Proveedor').subscribe((resp: any) => {
      console.log(resp);
    })
  }
}
