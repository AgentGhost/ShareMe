import { async, TestBed } from "@angular/core/testing"

import { AppComponent } from "./app.component"
import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ButtonsComponent,
        SongsComponent,
        SearchComponent,
        HeaderComponent,
      ],
    }).compileComponents()
  }))

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
})
