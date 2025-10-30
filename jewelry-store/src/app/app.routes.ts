import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductEditComponent } from './components/product-edit/product-edit';
import { ProductAddComponent } from './components/product-add/product-add';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { AuthGuard } from './auth-guard';
import { UserGuard } from './user-guard';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { CartComponent } from './components/cart/cart';


export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'add',  component: ProductAddComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'edit/:id', component: ProductEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent}
];
