import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LANGUAGES } from 'app/core/injection-tokens';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from 'app/shared/states/root.reducer';
import { IStore } from 'app/shared/interfaces/store.interface';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<IStore>;
  let translateService: TranslateMockService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [StoreModule.forRoot(reducers, { metaReducers })],
        providers: [
          { provide: TranslateService, useClass: TranslateMockService },
          { provide: LANGUAGES, useValue: ['en', 'fr'] },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    store = TestBed.get(Store);
    translateService = TestBed.get(TranslateService);
  });

  it('should set the lang by using the one from the browser if the environment variable for that is true', () => {
    spyOn(translateService, 'getBrowserLang').and.callThrough();
    spyOn(translateService, 'setDefaultLang');
    spyOn(translateService, 'use');
    spyOn(store, 'dispatch').and.callThrough();

    // simulate that the browser is set to english by default
    translateService.browserLang = 'en';

    store.dispatch(
      new UiActions.SetLanguage({
        language: 'en',
      })
    );

    // calling detectChanges for the first time will trigger the ngOnInit
    fixture.detectChanges();

    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UiActions.SetLanguage({ language: 'en' })
    );

    expect(translateService.use).toHaveBeenCalledWith('en');
  });
});

@Injectable()
export class TranslateMockService {
  browserLang: string;

  getBrowserLang() {
    return this.browserLang;
  }

  setDefaultLang(defaultLang: string) {}

  use(lang: string) {}
}
