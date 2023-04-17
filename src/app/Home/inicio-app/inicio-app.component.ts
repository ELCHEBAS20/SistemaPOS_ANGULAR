import { Component, OnInit } from '@angular/core';
import { AppConsumo } from '../../Config/Services/Consumo.component';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-app',
  templateUrl: './inicio-app.component.html',
  styleUrls: ['./Inicio-app.component.css']
})
export class InicioAppComponent implements OnInit {


  public NProducto: number;
  public NEmpleados: number;
  public cards: any = [];
  public Logo: any = [];
  public Span: any = [];
  public textCreate: any = [];
  public ColorStrl: string[] = ['#2280FF', '#FA1B32', '#0DEC54'];
  public Icons: string[] = ['fa-sharp fa-solid fa-user', 'fa-solid fa-book', 'fa-solid fa-piggy-bank'];
  public RstElement: any = [];

  //*************GroupBy********************//
  public Bebidas: number = 2;
  public Paquetes: number;
  public Aseo: number;
  public Mascota: number;
  //*************GroupBy********************//

  @ViewChild("btn_actualizar") btnUpdate: ElementRef;

  constructor(public AppConsumo: AppConsumo, public render: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.function_createElement();
    this.functionCharAtBAR();
    this.functionCharAtPIE();


  }

  public Function_SETDefCantidadProductos(): void {
    this.AppConsumo.function_GetCantidadCards("Productos", "ContadorEmpleados", "VSearch").subscribe((resp: any) => {
      this.NProducto = resp;
      const ElemenHtml = document.getElementById('_Rst_1') as HTMLElement;
      ElemenHtml.textContent = this.NProducto.toString();
    })
  }

  public Function_SETDefCantidadEmpleados(): void {
    this.AppConsumo.function_GetCantidadCards("Cajeros", "ContadorEmpleados", "VSearch").subscribe((resp: any) => {
      this.NEmpleados = resp;
      const ElemenHtml = document.getElementById('_Rst_0') as HTMLElement;
      ElemenHtml.textContent = this.NEmpleados.toString();
    })
  }

  public function_createElement() {
    let tipoCard = ['Empleados', 'Productos', 'Ganancias'];
    for (let index = 0; index < 3; ++index) {
      this.cards[index] = document.createElement('div');
      this.cards[index].id = 'infoBx' + index;
      this.cards[index].style.background = `${this.ColorStrl[index]}`;
      this.cards[index].style.width = '360px';
      this.cards[index].style.height = '200px';
      this.cards[index].style.marginLeft = '2rem';
      this.cards[index].style.boxShadow = 'rgba(0, 0, 0, 0.24) 0px 3px 8px';
      this.cards[index].style.borderRadius = '10px';
      this.Logo[index] = document.createElement('i');
      this.Logo[index].className = `${this.Icons[index]}`;
      this.Logo[index].style.fontSize = '5rem';
      this.Logo[index].style.position = 'relative';
      this.Logo[index].style.left = '250px';
      this.Logo[index].style.top = '55px';
      this.Logo[index].style.color = '#fff';
      this.Span[index] = document.createElement('span');
      this.Span[index].id = 'txt_' + index;
      this.Span[index].style.position = 'relative';
      this.Span[index].style.top = '78px';
      this.Span[index].style.left = '-40px';
      this.Span[index].style.fontSize = '2rem';
      this.textCreate[index] = document.createTextNode(tipoCard[index]);
      this.RstElement[index] = document.createElement('h2');
      this.RstElement[index].id = '_Rst_' + index;
      this.RstElement[index].style.position = 'relative';
      this.RstElement[index].style.left = '30px';
      this.RstElement[index].style.top = '-50px';

      if (index == 2) {
        this.RstElement[index].innerHTML = 'S/.&nbsp;0.00';
      }

      document.getElementById('bx_main')?.appendChild(this.cards[index]);
      document.getElementById('infoBx' + index)?.appendChild(this.Logo[index]);
      document.getElementById('infoBx' + index)?.appendChild(this.Span[index]);
      document.getElementById('txt_' + index)?.appendChild(this.textCreate[index])
      document.getElementById('infoBx' + index)?.appendChild(this.RstElement[index]);

    }

  }

  public functionCharAtBAR() {

    this.Function_SetGroupBy();

    setTimeout(() => {
      var myChart = new Chart("myChart", {
        type: 'bar', // bar,pie
        data: {
          labels: ["Bebida", "Paquetes", "Aseo", "Mascota"],
          datasets: [{
            label: 'SinFiltro',
            data: [this.Bebidas, this.Paquetes, this.Aseo, this.Mascota],
            backgroundColor: ['#ff0000', '#4DFF45', '#FFFC45', '#A845FF']
          }]
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 40
            }
          }
        }
      });
    }, 200)



  }

  public functionCharAtPIE() {
    this.Function_SetGroupBy();

    setTimeout(() => {
      var myChart = new Chart("myChart2", {
        type: 'pie', // bar,pie
        data: {
          labels: ["Bebida", "Paquetes", "Aseo", "Mascota"],
          datasets: [{
            label: 'Cantidad',
            data: [this.Bebidas, this.Paquetes, this.Aseo, this.Mascota],
            backgroundColor: ['#ff0000', '#4DFF45', '#FFFC45', '#A845FF']
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });

    }, 200)

  }

  public Function_SetGroupBy() {
    this.AppConsumo.function_GrupoBYProductos("Productos", "NOTNULL", "CantiGrupos").subscribe((resp: any) => {
      this.Function_GetGroupBy(resp);
    })

  }

  public Function_GetGroupBy(resp: string): any {
    this.Aseo = parseInt(resp.split('-')[0]);
    this.Bebidas = parseInt(resp.split('-')[2]);
    this.Mascota = parseInt(resp.split('-')[4]);
    this.Paquetes = parseInt(resp.split('-')[6]);

    console.log(this.Aseo);
    console.log(this.Bebidas);

  }

  public FunctionActualizarGraphics() {
    this.functionCharAtPIE();
    this.functionCharAtBAR();
  }
}