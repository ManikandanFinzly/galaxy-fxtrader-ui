import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, 
  MatIconModule, MatFormFieldModule, MatCardModule,MatDialogModule, MatMenuModule,MatSidenavModule,MatAutocompleteModule,
  MatTableModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatSelectModule, } from '@angular/material';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponentComponent } from 'app/fx-pricing-tiers/landing-component/landing-component.component';
import { CustomDateTimePipe } from 'app/fx-pricing-tiers/custom.datetimepipe';
import { HorizontalMenuComponent } from 'app/theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from 'app/theme/components/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
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
    MatSlideToggleModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: [
  ]
})
export class GlobalControlModuleModule { }
