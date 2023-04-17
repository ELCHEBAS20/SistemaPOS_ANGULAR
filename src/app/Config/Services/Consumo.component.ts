import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExepcionApp } from '../ExepcionesTS/Exepcion.component';

@Injectable({
  providedIn: 'root'
})

export class AppConsumo {

  private url: string = ' ';
  public static ActionDb: string;

  constructor(public HtppCliente: HttpClient, public Exepcion: ExepcionApp) {
    // this.url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/';
  }


  // public Function_AppLista(Data: any, url: string) {
  //   return this.HtppCliente.post(url, { FilterData: '1031171371213' });
  // }

  public Function_AppAcceso(FormValue: any) {
    this.url += AppConsumo.ActionDb = 'Login.php?ActionUser=Acceso';
    return this.HtppCliente.post(this.url, FormValue)
  }


  /*=======================*/
  /* En esta area estamos consumiendo App para productos en general.
  /*=======================*/

  public Function_SETNproductos() {
    this.url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/Productos.php';
    return this.HtppCliente.get(this.url);
  }

  /*=======================*/
  /* En esta area estamos consumiendo App para productos en general.
  /*=======================*/

  /*=======================*/
  /* En esta area estamos consumiendo App para usuario en general.
  /*=======================*/
  public function_SETNEmpleados() {
    this.url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/Usuario.php?UsuarioAction=CountEmpleado';
    return this.HtppCliente.get(this.url);
  }

  public function_ListarEmpleados() {
    this.url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/Usuario.php?UsuarioAction=ListarTable';
    return this.HtppCliente.get(this.url);
  }

  public function_Update_Empleados(idEmpleado: number) {
    this.url = `http://localhost/dashboard/AppSistemas_Ventas/Backend/Usuario.php?UsuarioAction=UpdateEmple&&IdEmpleado=${idEmpleado}`;
    return this.HtppCliente.get(this.url);
  }

  public function_update__total(data: any) {
    this.url = `http://localhost/dashboard/AppSistemas_Ventas/Backend/Usuario.php?UsuarioAction=-`;
    return this.HtppCliente.post(this.url, data);
  }

  // public function_ultimo_id_insertar() {
  //   this.url = 'http://localhost/dashboard/AppSistemas_Ventas/Backend/Usuario.php?UsuarioAction=UltimoId';
  //   return this.HtppCliente.get(this.url);
  // }

  /*=======================*/
  /* Aca cierra el area de usuarios
  /*=======================*/


  /*======================*/
  /*Consumo de C# backend*/
  /*======================*/


  /**======================================= */
  public validar_Url(objClass: string, idObj?: number) {
    this.url = '';
    this.url = `https://localhost:7205/api/${objClass}`;
    return this.url;
  }

  public validar_Url_Max_Two_Params(objClass: string, idObj: number) {
    this.url = '';
    this.url = `https://localhost:7205/api/${objClass}/${idObj}`;
    return this.url;
  }

  public validar_Login(objClass: string, user: string, pswd: string) {
    this.url = '';
    this.url = `https://localhost:7205/api/${objClass}/user=${user}&pswd=${pswd}`;
    return this.url;
  }

  public cantidadCards(objClass: string, VSearch: string, FilterValor: string) {
    this.url = '';
    this.url = `https://localhost:7205/api/${objClass}/${FilterValor}?${FilterValor}=${VSearch}`;
    return this.url;
  }
  /**======================================= */


  public function_GET_LISTAR(objClass: string) {
    return this.HtppCliente.get(this.validar_Url(objClass));
  }

  public function_POST(data: any, objClass: string) {
    return this.HtppCliente.post(this.validar_Url(objClass), data, { responseType: 'text' });
  }

  public function_PUT(data: any, objClass: string) {
    return this.HtppCliente.put(this.validar_Url(objClass), data);
  }

  public function_GET_ID(idObj: number, objClass: string) {
    return this.HtppCliente.get(this.validar_Url_Max_Two_Params(objClass, idObj));
  }

  public function_Login_Rol(obj: string, usuario: string, contra: string) {
    return this.HtppCliente.get(this.validar_Login(obj, usuario, contra), { responseType: 'text' });
  }

  public function_GetCantidadCards(objClass: string, StrlSearch: string, FilterValor: string) {
    return this.HtppCliente.get(this.cantidadCards(objClass, StrlSearch, FilterValor), { responseType: 'text' })
  }

  public function_GrupoBYProductos(objClass: string, StrlSearch: string, FilterValor: string) {
    return this.HtppCliente.get(this.cantidadCards(objClass, StrlSearch, FilterValor), { responseType: 'text' });
  }

  public getProducto(objClass: string, idCodigo: string) {
    return this.HtppCliente.get(this.validar_Url_Max_Two_Params(objClass, parseInt(idCodigo)));
  }

}
