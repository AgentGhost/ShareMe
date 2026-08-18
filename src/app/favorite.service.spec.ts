import { FavoriteService } from "./favorite.service"
import { ListItem } from "./song.service"

describe("FavoriteService", () => {
  let service: FavoriteService

  beforeEach(() => {
    localStorage.clear()
  })

  it("should be created and initialize empty favorites when localStorage is empty", () => {
    service = new FavoriteService()
    expect(service).toBeTruthy()
    expect(service.favorites.value).toEqual({})
  })

  it("should restore initial favorites from localStorage", () => {
    const mockFavs = { "test song": 1 }
    localStorage.setItem("favorites", JSON.stringify(mockFavs))
    service = new FavoriteService()
    expect(service.favorites.value).toEqual(mockFavs)
  })

  it("should toggle favorite on and off", () => {
    service = new FavoriteService()
    const song: ListItem = {
      book: "g",
      number: 1,
      name: "Test Song",
      fulltextSearch: "test song"
    }

    service.toggle(song)
    expect(service.favorites.value["test song"]).toBe(1)
    expect(localStorage.getItem("favorites")).toContain("test song")

    service.toggle(song)
    expect(service.favorites.value["test song"]).toBeUndefined()
  })

  it("should handle storage event from other window/tab", () => {
    service = new FavoriteService()
    const newFavs = { "remote song": 1 }

    const storageEvent = new StorageEvent("storage", {
      key: "favorites",
      newValue: JSON.stringify(newFavs)
    })
    window.dispatchEvent(storageEvent)

    expect(service.favorites.value).toEqual(newFavs)
  })
})
