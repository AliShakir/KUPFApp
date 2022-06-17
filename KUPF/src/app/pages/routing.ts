import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path :'auth',
    loadChildren:()=>import('../modules/home/auth/auth-routing.module').then((m)=>m.AuthRoutingModule)
  },
  {
    path :'employee',
    loadChildren:()=>import('../modules/home/employeeinformation/employeeinformation.module').then((m)=>m.EmployeeinformationModule)
  },
  {
    path :'references',
    loadChildren:()=>import('../modules/home/setup/setup.module').then((m)=>m.SetupModule)
  },
  {
    path :'service-setup',
    loadChildren:()=>import('../modules/home/service-setup/service-setup.module').then((m)=>m.ServiceSetupModule)
  },
  {
    path :'communication',
    loadChildren:()=>import('../modules/home/communication/communication.module').then((m)=>m.CommunicationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
