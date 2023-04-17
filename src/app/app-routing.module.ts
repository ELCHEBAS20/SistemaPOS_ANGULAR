import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionAppComponent } from './Components/Cajero/Facturacion_Cajero/facturacion-app.component';
import { LoginAppComponent } from './Home/login-app/login-app.component'
import { PageNotFoundComponent } from '../app/Config/page-not-found/page-not-found.component'
import { NavbarFacturacionComponent } from '../app/Components/Facturacion/navbar-facturacion.component'
import { ViewProductosComponent } from './Components/view-productos/view-productos.component';
import { InicioAppComponent } from './Home/inicio-app/inicio-app.component';
import { UsuariosViewComponent } from './Components/usuarios-view/usuarios-view.component';
import { ProveedorComponent } from '../app/Components/proveedor/proveedor.component';
import { ViewFacturaComponent } from '../app/Components/view-factura/view-factura.component';
import { ViewSucursalesComponent } from '../app/Components/view-sucursales/view-sucursales.component';
import { PreguntaFrecuentesComponent } from '../app/Components/pregunta-frecuentes/pregunta-frecuentes.component';


const routes: Routes = [

  { path: 'Login', component: LoginAppComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Facturacion', component: FacturacionAppComponent },
  { path: 'NavbarFacturar', component: NavbarFacturacionComponent },
  { path: 'Productos', component: ViewProductosComponent },
  { path: 'InicioAppComponent', component: InicioAppComponent },
  { path: 'Usuarios', component: UsuariosViewComponent },
  { path: 'Proveedor', component: ProveedorComponent },
  { path: 'VisuFacturacion', component: ViewFacturaComponent },
  { path: 'Sucursales', component: ViewSucursalesComponent },
  { path: 'Preguntas', component: PreguntaFrecuentesComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}