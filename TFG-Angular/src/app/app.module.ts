import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { ArticulosComponent } from './components/articulos/articulos/articulos.component';
import { AlbaranesComponent } from './components/albaranes/albaranes.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { AltaUsuarioComponent } from './components/usuario/alta-usuario/alta-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { AltaClienteComponent } from './components/cliente/alta-cliente/alta-cliente.component';
import { EditarArticulosComponent } from './components/articulos/editar-articulos/editar-articulos.component';
import { AltaArticulosComponent } from './components/articulos/alta-articulos/alta-articulos.component';
import { DatosComponent } from './components/datos/datos.component';
import { ActualizarStockComponent } from './components/articulos/actualizar-stock/actualizar-stock.component';
import { AltaPedidoComponent } from './components/pedido/alta-pedido/alta-pedido.component';
import { RellenarPedidoComponent } from './components/pedido/rellenar-pedido/rellenar-pedido.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuarioComponent,
    ClienteComponent,
    ArticulosComponent,
    AlbaranesComponent,
    FacturasComponent,
    AltaUsuarioComponent,
    EditarUsuarioComponent,
    HeaderComponent,
    MenuComponent,
    DialogoConfirmacionComponent,
    EditarClienteComponent,
    AltaClienteComponent,
    EditarArticulosComponent,
    AltaArticulosComponent,
    DatosComponent,
    ActualizarStockComponent,
    AltaPedidoComponent,
    RellenarPedidoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    PerfectScrollbarModule,
    NgbModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
  appRoutingProviders
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class AppModule { }
