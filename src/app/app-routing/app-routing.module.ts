import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { MapDistrictComponent } from '../pages/map-district/map-district.component';
import { MapVelovComponent } from '../pages/map-velov/map-velov.component';
import { MapTouristicAreaComponent } from '../pages/map-touristic-area/map-touristic-area.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  { path: 'map-district', component: MapDistrictComponent },
  { path: 'map-touristic-area', component: MapTouristicAreaComponent },
  {
    path: 'map-velov',
    component: MapVelovComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {
}
