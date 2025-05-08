import { Routes } from '@angular/router';

export const STAFF_ROUTES: Routes = [
  {
    path: 'drr',
    loadComponent: () =>
      import('../staff/drr/drr.component').then((m) => m.DrrComponent), // Lazy-load DashboardHomeComponent
  },
  {
      path:'kpi/research',
      loadComponent:() => import('../staff/kpi/research/research.component').then(m => m.ResearchComponent)
  },
  
  {
    path: 'kpi/fdp-sttp-workshop',
    loadComponent: () =>
      import('../staff/kpi/fdp-sttp-workshop/fdp-sttp-workshop.component').then(
        (m) => m.FdpSttpWorkshopComponent
      ),
  },
  {
    path: 'kpi/ind-ins-interaction',
    loadComponent: () =>
      import(
        '../staff/kpi/ind-ins-interaction/ind-ins-interaction.component'
      ).then((m) => m.IndInsInteractionComponent),
  },
  {
    path: 'kpi/student-development',
    loadComponent: () =>
      import(
        '../staff/kpi/student-development/student-development.component'
      ).then((m) => m.StudentDevelopmentComponent),
  },
  {
    path: 'kpi/admmission',
    loadComponent: () =>
      import('../staff/kpi/admission/admission.component').then(
        (m) => m.AdmissionComponent
      ),
  },
  {
    path: 'kpi/aca-gustlec-arranged',
    loadComponent: () =>
      import(
        '../staff/kpi/aca-gustlec-arranged/aca-gustlec-arranged.component'
      ).then((m) => m.AcaGustlecArrangedComponent),
  },
  {
    path: 'kpi/internal-revnu-gen',
    loadComponent: () =>
      import(
        '../staff/kpi/internal-revnu-gen/internal-revnu-gen.component'
      ).then((m) => m.InternalRevnuGenComponent),
  },
  {
    path: 'kpi/administrative-resp',
    loadComponent: () =>
      import(
        '../staff/kpi/administrative-resp/administrative-resp.component'
      ).then((m) => m.AdministrativeRespComponent),
  },
  {
    path: 'kpi/exam-sec-resp',
    loadComponent: () =>
      import('../staff/kpi/exam-sec-resp/exam-sec-resp.component').then(
        (m) => m.ExamSecRespComponent
      ),
  },
  // {
  //   path:'kpi/',
  //   loadComponent:() => import('../staff/kpi/').then(m => m.)
  // },
  // {
  //   path: 'ic',
  //   loadComponent: () => import('../pages/issued-certificate/issued-certificate.component')
  //     .then(m => m.IssuedCertificateComponent) // Lazy-load DashboardSettingsComponent
  // }
];
