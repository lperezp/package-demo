import { NgModule } from '@angular/core';
import { CulqiService } from './CulqiService';
@NgModule({
  declarations: [
    CulqiService,
  ],
  exports: [
    CulqiService,
  ],
})
export class CulqiModule {}