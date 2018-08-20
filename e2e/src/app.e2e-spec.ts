import { AppPage } from "./app.po"

describe("workspace-project App", () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it("should display the header", () => {
    page.navigateTo()
    expect(page.getHeader().isDisplayed()).toBeTruthy()
  })
})
