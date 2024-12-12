import { Routes } from '@angular/router';
import {ProjectPageComponent} from './components/project-page/project-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {UploadImagesComponent} from './components/upload-images/upload-images.component';
import {CreateProjectPageComponent} from './components/create-project-page/create-project-page.component';
import {ProjectsPageComponent} from './components/projects-page/projects-page.component';
import {PaymentComponent} from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'project/:id', component: ProjectPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: UserPageComponent },
  { path: 'upload-images/:id', component: UploadImagesComponent },
  { path: 'create-project', component: CreateProjectPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'payment/:id', component: PaymentComponent },
];
