import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AuthService } from '../../core/auth/auth.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    const authServiceMock = {
      getStoredUser: jasmine.createSpy('getStoredUser')
        .and.returnValue(Promise.resolve(null)),
      logout: jasmine.createSpy('logout')
        .and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        provideIonicAngular(),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear la pantalla principal', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar la tarjeta Ayuda al operador', () => {
    const pantalla: HTMLElement = fixture.nativeElement;
    const tarjetas = Array.from(
      pantalla.querySelectorAll('ion-card')
    );

    const ayuda = tarjetas.find(tarjeta =>
      tarjeta.querySelector('ion-card-title')
        ?.textContent?.includes('Ayuda al operador')
    );

    expect(ayuda).toBeDefined();
    expect(ayuda?.textContent).toContain('Registrar vehículo');
    expect(ayuda?.textContent).toContain('Salir');
      });
});