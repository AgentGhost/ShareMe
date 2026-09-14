import { SuggestionService } from "./suggestion.service"

describe("SuggestionService", () => {
  let service: SuggestionService

  beforeEach(() => {
    service = new SuggestionService()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  it("should return empty array for empty input or whitespace", () => {
    expect(service.getSuggestions("")).toEqual([])
    expect(service.getSuggestions("   ")).toEqual([])
    expect(service.getSuggestions(null as any)).toEqual([])
  })

  it("should search by qualifier prefix", () => {
    // Qualifier 'g' or 'b' with number
    const results = service.getSuggestions("g1")
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].qualifierSearch).toContain("g1")
  })

  it("should perform fulltext search when no qualifier match is found", () => {
    const results = service.getSuggestions("danken")
    expect(results.length).toBeGreaterThan(0)
    expect(results.every(s => s.fulltextSearch?.includes("danken"))).toBeTrue()
  })

  it("should handle multiple words in fulltext search", () => {
    const results = service.getSuggestions("will dir")
    expect(results.length).toBeGreaterThan(0)
    results.forEach(song => {
      expect(song.fulltextSearch).toContain("will")
      expect(song.fulltextSearch).toContain("dir")
    })
  })

  it("should normalize input with special characters and accents", () => {
    const results1 = service.getSuggestions("g-1!")
    const results2 = service.getSuggestions("g1")
    expect(results1).toEqual(results2)
  })
})
