import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AppConsumo } from '../../Config/Services/Consumo.component';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup } from '@angular/forms';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-view-factura',
  templateUrl: './view-factura.component.html',
  styleUrls: ['./view-factura.component.css']
})
export class ViewFacturaComponent implements OnInit {


  public getListarCliente: any = [];
  public getListarFactura: any = [];
  public getFilterFactura: any = [];
  public getColumns: any = [];
  public setTipoPago: any = [];
  public dateToday = new Date().toLocaleString();

  @ViewChild('cmbProductos') cmbxProducto: ElementRef;

  public formFactura = new FormGroup({
    nombreCliente: new FormControl(''),
    correoCliente: new FormControl(''),
    DireccionCliente: new FormControl(''),
    telefonoCliente: new FormControl('')
  });

  constructor(public appConsumo: AppConsumo, public render: Renderer2) { }

  ngOnInit(): void {

    this.function_SetFactura();
    this.function_SetClientes();
    this.setTipoPagos();
    this.getProductos();

    setTimeout(() => {
      this.OptionDatatable();
    }, 400)
  }

  public OptionDatatable() {
    $('#user-table').DataTable({
      pageLength: 10,
      processing: true,
      lengthMenu: [5, 10, 25],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      }
    });
  }

  public function_SetFactura(): void {
    this.appConsumo.function_GET_LISTAR('Facturas').subscribe((resp: any) => {
      this.getListarFactura = resp;
      console.log(this.getListarFactura);
    })
  }

  public function_SetClientes(): void {
    this.appConsumo.function_GET_LISTAR('Clientes').subscribe((resp: any) => {
      this.function_GetCliente(resp);
    });
  }

  public function_GetCliente(data: any) {
    this.getListarCliente = data;
    console.log(this.getListarCliente)
  }

  public async imprimirPdf(objData: string, idFactura: number) {

    let UsuarioFilter = this.getListarCliente.filter((item: { idCliente: string; }) => item.idCliente == objData)

    console.log(UsuarioFilter[0]);

    let obj = [
      {
        producto: 'galleta',
        unidad: '2',
        precioUnidad: '2000',
        vtotal: '2000'
      }, {
        producto: 'galleta',
        unidad: '2',
        precioUnidad: '2000',
        vtotal: '2000'
      }
    ]

    const pdfDefinicion: any = {
      content: [
        {
          image: await this.getBase64ImageFromURL('../../../assets//LogoFactura/AngularPdf.png'),
          alignment: 'center',
          width: 75
        },
        {
          text: 'FACTURA ELECTRONICA',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: 'POSBYU',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        }, {
          text: 'NIT. 860.007.322-9',
          fontSize: 10,
          alignment: 'center',
          color: '#047886',
        }, {
          text: 'Datos Personales',
          style: 'sectionHeader'
        }, {
          columns: [
            [
              {
                text: `${UsuarioFilter[0].nombreCliente + "" + UsuarioFilter[0].apellidoCliente}`,
                bold: true
              },
              { text: `${UsuarioFilter[0].dire}` },
              { text: `${UsuarioFilter[0].correo}` },
              { text: `${UsuarioFilter[0].telefono}` }
            ],
            [
              {
                text: `Fecha: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Factura Nº: ${idFactura}`,
                alignment: 'right'
              }
            ]
          ]
        }, {
          text: 'Detalle de la compra: ',
          style: 'sectionHeader'
        }, {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio-Unidad', 'Cantidad', 'Valor Total']
            ]
          }
        }, {
          text: 'Terminos y condiciones.',
          style: 'sectionHeader'
        }, {
          ul: [
            'Para garantiza plazo de 10 dias habiles.',
            'La garantía del producto estará sujeta a los términos y condiciones del fabricante.',
            'Esta es una factura generada por el sistema.',
          ],
        }, {
          text: '',
          bold: true,
          style: 'sectionFooter'
        }, {
          text: '________________________________________________________',
          bold: true,
          alignment: 'left',
        },
        {
          text: 'Firma digital de la persona encargada',
          bold: true,
          alignment: 'left',
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }, sectionFooter: {
          margin: [0, 0, 0, 60]
        }
      }, footer: {
        columns: [
          [
            {
              text: `Copyright @ 2023 POSBYU.`,
              alignment: 'center',
              bold: true,
              fontSize: 10
            }
          ]
        ]
      }

    }

    for (let index = 0; index < obj.length; ++index) {
      pdfDefinicion.content[7].table.body.push([obj[index].producto, obj[index].precioUnidad,
      obj[index].unidad, obj[index].vtotal])
    }

    pdfDefinicion.content[7].table.body.push([{ text: 'Total a pagar', colSpan: 3 }, {}, {}, '4000'])

    const PDF = pdfMake.createPdf(pdfDefinicion);
    PDF.download();

  }

  public getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });

  }

  public HistorialCliente(item: number, identity: number) {
    let RstFilter = this.getListarFactura.filter((index: { idCliente: number }) => index.idCliente == item);
    return this.getFilterFactura = RstFilter;
  }

  public setTipoPagos() {
    this.appConsumo.function_GET_LISTAR('TipoPago').subscribe((resp: any) => {
      this.setTipoPago = resp;
      console.log(this.setTipoPago);
    })
  }

  public addFactura(data: string) {
    if (data.length == 8 || data.length == 10) {
      var RstFactura = this.getListarCliente.filter((item: { cedula: string }) => item.cedula == data);
      ;
      this.formFactura = new FormGroup({
        nombreCliente: new FormControl(RstFactura[0].nombreCliente),
        correoCliente: new FormControl(RstFactura[0].correo),
        DireccionCliente: new FormControl(RstFactura[0].dire),
        telefonoCliente: new FormControl(RstFactura[0].telefono)
      });

    } else {
      this.formFactura.reset();
    }

    console.log(this.formFactura.value);


  }

  public getProductos() {

    let cmbMain = document.getElementById('cmbMain') as HTMLElement;
    let countCmb = 1;

    this.appConsumo.function_GET_LISTAR('Productos').subscribe((resp: any) => {
      for (let index in resp) {
        cmbMain.innerHTML += `<option value="${resp[index].codigoBarras}" >${countCmb++}.${resp[index].nombreProducto}</option>`;
      }
    })
  }
}
