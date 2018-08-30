import { Component, Input, Output } from "@angular/core"

@Component({
  selector: "app-suggestions",
  templateUrl: "./suggestions.component.html",
  styleUrls: ["./suggestions.component.scss"],
})
export class SuggestionsComponent  {

  @Input() suggestions: Output[]

}
