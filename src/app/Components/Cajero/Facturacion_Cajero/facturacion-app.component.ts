import { Component, AfterViewInit, Directive, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ExepcionApp } from '../../../Config/ExepcionesTS/Exepcion.component';
import { ToastrService } from 'ngx-toastr';
import { AppConsumo } from '../../../Config/Services/Consumo.component';
import Swal from 'sweetalert2';
import { Billing } from '../../../Model/Facturacion';


@Component({
  selector: 'app-facturacion-app',
  templateUrl: './facturacion-app.component.html',
  styleUrls: ['./facturacion-app.component.css']
})
export class FacturacionAppComponent implements AfterViewInit {

  public TitleMain: string = 'sistema de ventas';
  private Url: string;
  private ObjVenta: any = []; public CodigoProducto: any = [];
  public NameProducto: any = []; public CantidadProducto: any = [];
  public TotalPrecioProducto: any = []; public ValorProducto: any = [];
  public TotalProducto: number; public isDisabled: boolean = false;
  public ValorAPagar: number = 0;
  public ObjEnvio: Billing;
  public AppConsumo: AppConsumo;


  constructor(private appconsumo: AppConsumo, private ExepcionApp: ExepcionApp, private NotifeMsg: ToastrService, public render2: Renderer2) {
    this.Url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/Facturacion.php?ProductoDb=Search';
  }

  @ViewChild('TxtInput') TxtInput: ElementRef;

  ngAfterViewInit() {
    this.render2.setProperty(this.TxtInput.nativeElement, 'focus', []);
  }

  public Function_AppMain(e: KeyboardEvent, dataHTML: any): void {


    if (dataHTML.value.length == 13) {
      this.appconsumo.getProducto("Productos", dataHTML.value)
        .subscribe({
          next: Response => {
            try {
              this.Function_ListarApp(Response, dataHTML);
            } catch (error) {
              this.NotifeMsg.error(`${error}`, '¡Verificar por favor!');
            }
          }, error: e => {
            this.NotifeMsg.info(`${this.ExepcionApp.ExepBadRequest}`, 'Error 409 ')
          }
        })
    }

  }

  public Function_ListarApp(resp: any, info: any): void {

    this.ValorAPagar = 0;
    this.ObjVenta = [];
    this.TotalProducto = 0;
    let isSame = false;
    let TempPos = 0;

    if (resp.MsgFinal == true) {

      this.ObjVenta.push({
        Cod: resp.CodigoBarras,
        NameProduct: resp.NombreProducto,
        Precio: resp.ValorProducto,
        ValorProducto: resp.ValorProducto,
        Canti: 1
      })

      if (this.CodigoProducto.length != 0) {

        for (let index in this.CodigoProducto) {

          if (this.CodigoProducto[index] === info.value) {
            isSame = true;
            TempPos = parseInt(index);
          }
        }

        if (isSame != false) {
          this.CantidadProducto[TempPos]++;
          this.TotalPrecioProducto[TempPos] = this.functionValorAndProducto(TempPos);
        } else {
          this.CodigoProducto.push(this.ObjVenta[0].Cod);
          this.NameProducto.push(this.ObjVenta[0].NameProduct);
          this.CantidadProducto.push(this.ObjVenta[0].Canti);
          this.TotalPrecioProducto.push(parseInt(this.ObjVenta[0].Precio));
          this.ValorProducto.push(this.ObjVenta[0].ValorProducto);
          this.isDisabled = true;
        }
      } else {
        this.CodigoProducto.push(this.ObjVenta[0].Cod);
        this.NameProducto.push(this.ObjVenta[0].NameProduct);
        this.CantidadProducto.push(this.ObjVenta[0].Canti);
        this.TotalPrecioProducto.push(parseInt(this.ObjVenta[0].Precio));
        this.ValorProducto.push(this.ObjVenta[0].ValorProducto);
        this.isDisabled = true;
      }
    } else {
      this.NotifeMsg.error(`${this.ExepcionApp.ExepDb}`, 'Error Fatal.');
    }

    this.function_TotalPagar();
    info.value = '';
    setTimeout(() => {
      this.isDisabled = false;
    }, 2000)

  }

  public functionValorAndProducto(aux: number): number {
    return (this.ValorProducto[aux]) * (this.CantidadProducto[aux]);
  }

  public Function_DeletedElement(setId: number): void {

    const CantidadSET = this.CantidadProducto[setId];
    let getCodigo = this.CodigoProducto.indexOf(this.CodigoProducto[setId]);
    let getNameProducto = this.NameProducto.indexOf(this.NameProducto[setId]);
    let getCantidad = this.CantidadProducto.indexOf(CantidadSET);
    let getTotal = this.TotalPrecioProducto.indexOf(this.TotalPrecioProducto[setId]);
    let getValor = this.ValorProducto.indexOf(this.ValorProducto[setId]);

    if (parseInt(CantidadSET) > 1) {
      this.CantidadProducto[setId]--;
      this.TotalPrecioProducto[setId] = this.functionValorAndProducto(setId);
      this.function_TotalPagar();
    } else {
      Swal.fire({
        title: `¿Desea eliminar el producto?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,eliminar por favor.!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.CodigoProducto.splice(getCodigo, 1);
          this.NameProducto.splice(getNameProducto, 1);
          this.CantidadProducto.splice(getCantidad, 1);
          this.TotalPrecioProducto.splice(getTotal, 1);
          this.ValorProducto.splice(getValor, 1);
          this.NotifeMsg.success('Elemento eliminado con exito.', 'Congratulation.');
          this.function_TotalPagar();
        }
      })
    }
  }

  public Function_CompraProducto_(): void {

    let isAccepted = true;

    Swal.fire({
      title: "¿Cuanto dinero es?",
      text: "Escribe el dinero que recibiste,por favor:",
      input: 'text',
      confirmButtonText: 'Obtener.',
      confirmButtonColor: 'green'
    }).then((result) => {
      let StrlValorIO = result.value;
      if (parseInt(StrlValorIO) >= this.ValorAPagar) {
        if (StrlValorIO.length != 0) {
          for (let index = 0; index < StrlValorIO.length; index++) {
            for (let iterador = 0; iterador < this.ExepcionApp.alphabet.length; iterador++) {
              if (StrlValorIO.charAt(index).toLowerCase() == this.ExepcionApp.alphabet.charAt(iterador)) {
                isAccepted = false;
                break;
              }
            }
          }
        } else {
          isAccepted = false;
        }

        if (isAccepted != false) {
          Swal.fire(
            '',
            `El valor a devolver es: $.${parseInt(StrlValorIO) - this.ValorAPagar}`,
            'success',
          )
          this.ClearProducto();
        } else {
          this.NotifeMsg.error('Errores de sintaxis.', '¡ERROR FATAL!');
        }
      } else {
        this.NotifeMsg.info('No es adecuado el valor que esta ingresado.', 'ERROR FATAL!');
      }


    });

  }

  public function_TotalPagar(): void {
    this.ValorAPagar = 0;
    for (let iterador in this.TotalPrecioProducto) {
      this.ValorAPagar += this.TotalPrecioProducto[iterador];
    }
  }

  public ClearProducto(): void {

    this.CodigoProducto = [];
    this.CantidadProducto = [];
    this.NameProducto = [];
    this.ValorProducto = [];
    this.TotalPrecioProducto = [];
    this.isDisabled = false;
    this.ValorAPagar = 0;
  }

  public validarDatos() {

    let countInsert = 0;

    for (let index in this.NameProducto) {

      this.ObjEnvio = {
        nombreAdmin: this.NameProducto[index],
        apellidoAdmin: this.NameProducto[index],
        generoAdmin: this.NameProducto[index],
        usuarioAdmin: this.NameProducto[index],
        pswdAdmin: this.NameProducto[index],
        estadoAdmin: this.NameProducto[index]
      }

      // this.HttpCliente.post("https://localhost:7294/api/Admins", this.ObjEnvio, { responseType: 'text' }).subscribe((resp: any) => {
      //   console.log(resp)
      // });
      countInsert++;

    }

    let MsgInsert = countInsert == this.NameProducto.length ? 'Insertada la informacion' : null;


  }

}
