import { SongService } from "./song.service"

describe("SongService", () => {
  let service: SongService

  beforeEach(() => {
    localStorage.clear()
    service = new SongService()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should start with empty songs", () => {
    expect(service.songs.value).toEqual([])
  })

  it("should add a song", () => {
    const song = { book: "EG", number: 1, name: "Test Song" }
    service.add(song)
    expect(service.songs.value.length).toBe(1)
    expect(service.songs.value[0]).toEqual(song)
  })

  it("should remove a song", () => {
    const song = { book: "EG", number: 1, name: "Test Song" }
    service.add(song)
    service.remove(0)
    expect(service.songs.value.length).toBe(0)
  })

  it("should clear all songs", () => {
    service.add({ book: "EG", number: 1, name: "Test" })
    service.add({ book: "EG", number: 2, name: "Test2" })
    service.clear()
    expect(service.songs.value.length).toBe(0)
  })
})