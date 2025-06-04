import { TestBed } from '@angular/core/testing'
import { RouterModule } from '@angular/router'
import { App } from './app.component'
import { NxWelcomeComponent } from './nx-welcome.component'

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NxWelcomeComponent, RouterModule.forRoot([])],
    }).compileComponents()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(App)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome angular-demo',
    )
  })

  it(`should have as title 'angular-demo'`, () => {
    const fixture = TestBed.createComponent(App)
    const app = fixture.componentInstance
    expect(app.title).toEqual('angular-demo')
  })
})
