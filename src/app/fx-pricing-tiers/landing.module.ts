import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { routing } from './landing.routing';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { HorizontalMenuComponent } from 'app/theme/components/menu/horizontal-menu/horizontal-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatRadioModule, MatCheckboxModule, MatSidenavModule, MatSlideToggleModule, MatDialogModule, MatButtonToggleModule, MatMenuTrigger, MatMenu, MatMenuModule, MatBottomSheetModule, MatDialog, MatRadioButton, MatRadioGroup } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { LandingService } from './landing.service';
import { CustomDateTimePipe } from './custom.datetimepipe';
import {MatAutocompleteModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LandingComponentComponent } from './landing-component/landing-component.component';
import { GlobalControlModuleModule } from 'app/globalModules-components/global-control-module.module';


@NgModule({
  imports: [
    CommonModule,
    GlobalControlModuleModule,
    routing,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatInputModule,MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, 
    MatIconModule, MatFormFieldModule, MatCardModule,MatDialogModule, MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgxMatDrpModule,
    NgxDatatableModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  declarations: [
    BreadcrumbComponent,
    HorizontalMenuComponent,
    CustomDateTimePipe,
    LandingComponentComponent,
  ],
  entryComponents: [],
  providers:[ LandingService, CustomDateTimePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class LandingModule { }
