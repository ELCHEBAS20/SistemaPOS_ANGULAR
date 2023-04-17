import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { FacturacionAppComponent } from './Components/Cajero/Facturacion_Cajero/facturacion-app.component';
import { LoginAppComponent } from './Home/login-app/login-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from '../app/Config/page-not-found/page-not-found.component';
import { NavbarFacturacionComponent } from '../app/Components/Facturacion/navbar-facturacion.component';
import { ViewProductosComponent } from '../app/Components/view-productos/view-productos.component';
import { InicioAppComponent } from './Home/inicio-app/inicio-app.component';
import { UsuariosViewComponent } from '../app/Components/usuarios-view/usuarios-view.component';
import { HeaderComponent } from '../app/Template/header/header.component';
import { AsideComponent } from './Template/Aside/aside.component';
import { FooterComponent } from '../app/Template/footer/footer.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProveedorComponent } from './Components/proveedor/proveedor.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewFacturaComponent } from './Components/view-factura/view-factura.component';
import { ViewSucursalesComponent } from './Components/view-sucursales/view-sucursales.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { PreguntaFrecuentesComponent } from './Components/pregunta-frecuentes/pregunta-frecuentes.component';




@NgModule({
  declarations: [
    AppComponent,
    FacturacionAppComponent,
    LoginAppComponent,
    PageNotFoundComponent,
    NavbarFacturacionComponent,
    ViewProductosComponent,
    InicioAppComponent,
    UsuariosViewComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    ProveedorComponent,
    ViewFacturaComponent,
    ViewSucursalesComponent,
    PreguntaFrecuentesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1800,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    AppRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    NgChartsModule,
    MatTooltipModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
