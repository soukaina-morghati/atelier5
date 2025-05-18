import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  // Tests supplémentaires pour le TP

  it('doit afficher le titre <h2>', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('Liste des utilisateurs');
  });

  it('doit afficher les utilisateurs existants', () => {
    component.user = ['Alice', 'Bob'];
    fixture.detectChanges();
    const li = fixture.nativeElement.querySelectorAll('li');
    expect(li.length).toBe(2);
    expect(li[0].textContent).toContain('Alice');
    expect(li[1].textContent).toContain('Bob');
  });



  it('doit ajouter un utilisateur à la liste', () => {
    component.user = [];
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Charlie';
    input.dispatchEvent(new Event('input'));

    const addButton = fixture.debugElement.queryAll(By.css('button'))[2];
    addButton.nativeElement.click();
    fixture.detectChanges();

    const li = fixture.nativeElement.querySelectorAll('li');
    expect(li.length).toBe(1);
    expect(li[0].textContent).toContain('Charlie');
  });

  it('doit vider la liste', () => {
    component.user = ['A', 'B'];
    fixture.detectChanges();

    const viderButton = fixture.debugElement.queryAll(By.css('button'))[1];
    viderButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.user.length).toBe(0);
    const msg = fixture.nativeElement.querySelector('p');
    expect(msg?.textContent).toContain('Aucun utilisateurs dans la liste');
  });

  it('doit supprimer un utilisateur', () => {
    component.user = ['X', 'Y'];
    fixture.detectChanges();

    const supprimerButton = fixture.debugElement.queryAll(By.css('button'))[0];
    supprimerButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.user.length).toBe(1);
  });
});
