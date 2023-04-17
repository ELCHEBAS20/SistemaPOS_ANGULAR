import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConsumo } from '../../Config/Services/Consumo.component'
import { Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {

  public isPswd: boolean;
  public ImgSrcPswd: string;

  constructor(public ApiConsumo: AppConsumo, public render: Renderer2, public toastMsg: ToastrService) {
    this.isPswd = false;
  }

  @ViewChild("Error") TxtError: ElementRef;
  @ViewChild("ImgBoxPswd") ImgPswd: ElementRef;
  @ViewChild("Chck_Admin") ChckAdmin: ElementRef;
  @ViewChild("Chck_Cajero") ChckCajero: ElementRef;

  public setUser = new FormGroup({
    user: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required)
  })

  public functionValidAcceso(data: any) {

    let RstAdmin = this.ChckAdmin.nativeElement.checked;
    let RstCajero = this.ChckCajero.nativeElement.checked;
    let RstLogin = '';

    // if (!RstAdmin) {
    //   console.log(this.ChckCajero.nativeElement.value)
    // } else {
    //   console.log(this.ChckAdmin.nativeElement.value)
    // }


    if (RstAdmin == false && RstCajero == false) {
      this.toastMsg.error('¡Por favor seleccionar Rol.!', '')
    } else {
      if (RstAdmin) {
        RstLogin += 'Admins';
      } else {
        RstLogin += 'Cajeros';
      }

      switch (RstLogin) {
        case 'Admins':
          this.ApiConsumo.function_Login_Rol(RstLogin, data.user, data.pswd).subscribe((resp: any) => {
            this.functionActionLogin(resp, RstLogin);
          })
          break;
        case 'Cajero':
          this.ApiConsumo.function_Login_Rol(RstLogin, data.user, data.pswd).subscribe((resp: any) => {
            this.functionActionLogin(resp, RstLogin);
          })
          break;
      }
    }
  }

  private functionActionLogin(InfoArray: any, RolUsuario: string): void {


    if (InfoArray != '') {
      let _Strl_ = '';
      switch (RolUsuario) {
        case 'Admins':
          _Strl_ = '<a href="/Usuarios">Por favor dale click para ingresar.</a>';
          sessionStorage.setItem('NameUser', InfoArray);
          break;
        case 'Cajeros':
          _Strl_ = '<a href="/Facturacion">Por favor dale click para ingresar.</a>';
          sessionStorage.setItem('NameUser', InfoArray);
          break;
      }
      this.render.setProperty(this.TxtError.nativeElement, 'innerHTML', _Strl_);
    } else {
      this.toastMsg.error('¡La informacion no se encuentra registrada,vuelve a intentar.!', '')
      this.render.setProperty(this.TxtError.nativeElement, 'innerHTML', '');
      sessionStorage.removeItem('NameUser');
    }
    this.isPswd = false;
  }

  public functionViewContra(): boolean {

    if (!this.isPswd) {
      this.isPswd = true;
      this.ImgSrcPswd = '<i class="fa-sharp fa-solid fa-eye"></i>';
    } else {
      this.isPswd = false;
      this.ImgSrcPswd = '<i class="fa-solid fa-eye-slash"></i>';
    }
    this.render.setProperty(this.ImgPswd.nativeElement, 'innerHTML', this.ImgSrcPswd);
    return this.isPswd;
  }

}
