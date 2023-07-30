import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app.route';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

  bootstrapApplication(AppComponent, {
    providers: [provideRouter(APP_ROUTE), provideAnimations(), importProvidersFrom(HttpClientModule)]
  })
