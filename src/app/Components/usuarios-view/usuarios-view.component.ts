import { Component, OnInit } from '@angular/core';
import { AppConsumo } from '../../Config/Services/Consumo.component';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { ExepcionApp } from '../../Config/ExepcionesTS/Exepcion.component';
import { Cajero } from '../../Model/Cajero';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-view',
  templateUrl: './usuarios-view.component.html',
  styleUrls: ['./usuarios-view.component.css']
})

export class UsuariosViewComponent implements OnInit {


  public disabled_table: boolean = true;
  public disabled_table_NO: boolean = true;
  public VisibleMsg: boolean = false;
  public datafinal: any;
  public Usuario: Cajero;


  public UserForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Usuario: new FormControl('', Validators.required),
    Contraseña: new FormControl('', Validators.required),
    Genero: new FormControl('', Validators.required),

  })

  constructor(public appConsumo: AppConsumo, public render: Renderer2, public ExepApp: ExepcionApp, public MsgToast: ToastrService) { }

  ngOnInit(): void {
    this.function_GETListarUser();
  }

  public function_GETListarUser() {
    this.appConsumo.function_GET_LISTAR("Cajeros").subscribe({
      next: data => {
        this.function_get_Consumo(data);

      }, error: e => {
        console.error(e);
      }
    })
  }

  public function_get_Consumo(data: any) {
    this.datafinal = data;
    console.log(this.datafinal)
    this.function_dinamica_tabla();
  }

  public function_Update_Switch(idValor: number, e: Event) {

    document.querySelectorAll('input[type="checkbox"]');
    // let confirm2 = confirm(`¿Desea Desactivar El Usuario?`);
    let btn = document.getElementById(`customSwitch${idValor}`) as HTMLButtonElement;
    let isSwal = true;

    if (isSwal) {
      e.preventDefault();
      btn.blur();
      Swal.fire({
        title: `¿Desea desactivar el usuario?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,desactivar el usuario.'
      }).then((result) => {
        if (result.isConfirmed) {
          btn.blur();
          this.appConsumo.function_GET_ID(idValor, 'Cajeros').subscribe((resp: any) => {
            this.function_GETListarUser();
          })
        } else {
          e.preventDefault();
          btn.blur();
        }
      })
    }

  }

  public function_UpdateEmpleadoTotal(idEmpleado: number, form: any) {

    let isEmpty = false;

    this.Usuario = {
      idCajero: parseInt(form.value.txt_id),
      nombreCajero: form.value.txt_nombre,
      apellidoCajero: form.value.txt_apellido,
      usuarioCajero: form.value.txt_user,
      generoCajero: form.value.txt_genero,
      pswdCajero: form.value.txt_pswd,
      estadoCajero: form.value.txt_status
    }

    let ObjArray = Object.values(this.Usuario);

    let Error300 = document.getElementById('txt_error' + idEmpleado) as HTMLElement;

    for (let index in ObjArray) {

      if (ObjArray[index] == '') {
        isEmpty = true;
        break;
      }
    }
    if (isEmpty == false) {
      this.render.selectRootElement('#close_modal' + idEmpleado).click();
      Error300.innerHTML = '';
      console.log(this.Usuario);
      this.appConsumo.function_PUT(this.Usuario, 'Cajeros').subscribe((resp: any) => {
        this.function_GETListarUser();
      })
    } else {
      Error300.innerHTML = this.ExepApp.MsgError300;
    }
  }

  public function_InsertarCajeros(formValor: any, StrlEstado: any, StrlCargo: any) {

    let RstNullValores = '';
    let RstNOTnullValores = '';

    this.Usuario = {
      nombreCajero: formValor.Nombre,
      apellidoCajero: formValor.Apellido,
      usuarioCajero: formValor.Usuario,
      pswdCajero: formValor.Contraseña,
      generoCajero: formValor.Genero,
      estadoCajero: StrlEstado.value
    }

    let ObjArray = Object.values(this.Usuario);

    for (let index = 0; index < ObjArray.length - 1; ++index) {

      if (ObjArray[index] == '' || ObjArray[index] == null) {
        RstNullValores += index;
      } else {
        RstNOTnullValores += index;
      }
    }

    if (RstNullValores.length != 0 || RstNOTnullValores.length != 0) {
      let StrlSplit = RstNullValores.split('');
      let StrlSplitNOTNULL = RstNOTnullValores.split('');

      for (let index = 0; index < StrlSplit.length; ++index) {
        let domHTML = document.getElementById('txt_error' + parseInt(StrlSplit[index])) as HTMLElement;
        domHTML.style.display = '';
      }

      for (let iterador = 0; iterador < StrlSplitNOTNULL.length; ++iterador) {
        let domHTML = document.getElementById('txt_error' + parseInt(StrlSplitNOTNULL[iterador])) as HTMLElement;
        domHTML.style.display = 'none';
      }
      if (RstNOTnullValores.length == 5 && RstNullValores.length == 0) {
        this.appConsumo.function_POST(this.Usuario, 'Cajeros').subscribe((resp: any) => {
          this.function_GETListarUser();
          this.MsgToast.success('Se inserto correctamen el usuario', '¡Insertado!')
          this.UserForm.reset();
        });

      }
    }


  }

  public function_dinamica_tabla() {

    let countActivos = 0, countInactivos = 0;

    this.disabled_table = true, this.disabled_table_NO = true;

    for (let index = 0; index < this.datafinal.length; ++index) {

      if (this.datafinal[index].estadoCajero == '1') {
        countActivos++;
      } else if (this.datafinal[index].estadoCajero == '0') {
        countInactivos++;
      }
    }

    if (countActivos == 0) {
      this.disabled_table = false;
    } else if (countInactivos == 0) {
      this.disabled_table_NO = false;
    }


  }

}
