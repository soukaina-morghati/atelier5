import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule], // Import AppComponent directly here
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in <h2>', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('User liste');
  });

  it('should display initial user', () => {
    component.user = ['Alice', 'Bob'];
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Alice');
    expect(listItems[1].textContent).toContain('Bob');
  });

  it('should show empty message if user list is empty', () => {
    component.user = [];
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector('p');
    expect(message?.textContent).toContain('Aucun utilisateur disponible');
  });

  it('should add a user to the list', () => {
    component.user = [];
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Charlie';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    addButton.nativeElement.click();
    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Charlie');
  });

  it('should remove the last user', () => {
    component.user = ['User1', 'User2'];
    fixture.detectChanges();

    const removeButton = fixture.debugElement.queryAll(By.css('button'))[1];
    removeButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.user.length).toBe(1);
    expect(component.user).toEqual(['User1']);
  });

  it('should clear all user', () => {
    component.user = ['User1', 'User2'];
    fixture.detectChanges();

    const clearButton = fixture.debugElement.queryAll(By.css('button'))[2];
    clearButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.user.length).toBe(0);
    const message = fixture.nativeElement.querySelector('p');
    expect(message?.textContent).toContain('Aucun utilisateur disponible');
  });
});
