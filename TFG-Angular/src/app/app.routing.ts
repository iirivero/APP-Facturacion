import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { AltaUsuarioComponent } from './components/usuario/alta-usuario/alta-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { DetallesUsuarioComponent } from './components/usuario/detalles-usuario/detalles-usuario.component';
import { ClienteComponent } from './components/cliente/cliente/cliente.component';
import { AltaClienteComponent } from './components/cliente/alta-cliente/alta-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { DetallesClienteComponent } from './components/cliente/detalles-cliente/detalles-cliente.component';
import { ArticulosComponent } from './components/articulos/articulos/articulos.component';
import { AltaArticulosComponent } from './components/articulos/alta-articulos/alta-articulos.component';
import { EditarArticulosComponent } from './components/articulos/editar-articulos/editar-articulos.component';
import { ActualizarStockComponent } from './components/articulos/actualizar-stock/actualizar-stock.component';
import { DetallesArticuloComponent } from './components/articulos/detalles-articulo/detalles-articulo.component';
import { DatosComponent } from './components/datos/datos.component';
import { AlbaranesComponent } from './components/albaranes/albaranes/albaranes.component';
import { DetallesAlbaranComponent } from './components/albaranes/detalles-albaran/detalles-albaran.component';
import { FacturasComponent } from './components/facturas/facturas/facturas.component';
import { DetallesFacturaComponent } from './components/facturas/detalles-factura/detalles-factura.component';
import { CrearFacturaComponent } from './components/facturas/crear-factura/crear-factura.component';
import { RellenarFacturaComponent } from './components/facturas/rellenar-factura/rellenar-factura.component';
import { AltaPedidoComponent } from './components/pedido/alta-pedido/alta-pedido.component';
import { RellenarPedidoComponent } from './components/pedido/rellenar-pedido/rellenar-pedido.component';


const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'login', component: LoginComponent},
	{path: 'usuario', component: UsuarioComponent},
	{path: 'alta-usuario', component: AltaUsuarioComponent},
	{path: 'editar-usuario/:uuid', component: EditarUsuarioComponent},
	{path: 'detalles-usuario/:uuid', component: DetallesUsuarioComponent},
	{path: 'cliente', component: ClienteComponent},
	{path: 'alta-cliente', component: AltaClienteComponent},
	{path: 'editar-cliente/:id', component: EditarClienteComponent},
	{path: 'detalles-cliente/:id', component: DetallesClienteComponent},
	{path: 'articulos', component: ArticulosComponent},
	{path: 'alta-articulos', component: AltaArticulosComponent},
	{path: 'editar-articulos/:codigo', component: EditarArticulosComponent},
	{path: 'actualizar-stock/:codigo', component: ActualizarStockComponent},
	{path: 'detalles-articulo/:codigo', component: DetallesArticuloComponent},
	{path: 'datos', component: DatosComponent},
	{path: 'albaranes', component: AlbaranesComponent},
	{path: 'detalles-albaran/:id', component: DetallesAlbaranComponent},
	{path: 'facturas', component: FacturasComponent},
	{path: 'crear-factura', component: CrearFacturaComponent},
	{path: 'rellenar-factura/:id/:id_cliente', component: RellenarFacturaComponent},
	{path: 'detalles-factura/:id', component: DetallesFacturaComponent},
	{path: 'alta-pedido', component: AltaPedidoComponent},
	{path: 'rellenar-pedido/:id', component: RellenarPedidoComponent},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

 