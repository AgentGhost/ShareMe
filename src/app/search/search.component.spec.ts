import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms"

import { SuggestionsComponent } from "src/app/suggestions/suggestions.component"

import { SearchComponent } from "./search.component"

describe("SearchComponent", () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        SuggestionsComponent,
        SearchComponent,
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
