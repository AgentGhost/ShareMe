import { Song } from "src/app/contents/Contents"
import { Iwdd } from "src/app/contents/Iwdd"
import { Loben } from "src/app/contents/Loben"
import { Output } from "src/app/songlist.service"

import { SuggestionService } from "./suggestion.service"

function lookup(id: number | string, book: string, songs: Song[]): Output {
  const song = songs.find(s => s.number === id || s.name === id)
  if (song) {
    return {
      book,
      number: song.number,
      name: song.name,
    }
  }
  throw new Error("No such song: " + id)
}

function loben(id: number | string): Output {
  return lookup(id, "Loben", Loben)
}

function iwdd(id: number | string): Output {
  return lookup(id, "Iwdd!", Iwdd)
}

fdescribe("Suchvorschläge", () => {
  const service = new SuggestionService()
  const search = (input) => service.getSuggestions(input)

  describe("Eingaben, nach denen Gesucht werden kann:", () => {

    it("Qualifier", () => {
      const results = search("g463")
      const expected = [iwdd(463)]
      expect(results).toEqual(expected)
    })

    it("Buch", () => {
      const results = search("Iwdd!")
      expect(results.length).toEqual(Iwdd.length)
    })

    it("Liednummer", () => {
      const results = search("63")
      const expected: Output[] = [
        iwdd(63), iwdd(163), iwdd(263), iwdd(363), iwdd(463),
        loben(63), loben(163), loben(263), loben(363),
      ]
      expect(results).toEqual(jasmine.arrayContaining(expected))
    })

    it("Name", () => {
      const results = search("Golgatha")
      const expected = [
        iwdd("Für mich gingst Du nach Golgatha (Herr, Deine Liebe ist so groß)"),
        iwdd("O Du Lamm Gottes, du hast auf Golgatha"),
        iwdd("Kennst Du den Weg zum Kreuz auf Golgatha"),
        loben("Auf dem Hügel Golgatha"),
        loben("Für mich gingst du nach Golgatha"),
      ]
      expect(results).toEqual(expected)
    })

    it("Kombination aus Buch, Liednummer und Name", () => {
      const results = search("Iwdd! 180 Golgatha")
      const expected = [iwdd(180)]
      expect(results).toEqual(expected)
    })

  })

  describe("Spezielles Suchverhalten", () => {

    it("Groß-Kleinschreibung wird ignoriert", () => {
      expect(search("g463")).toEqual(search("G463"))
      expect(search("Iwdd!")).toEqual(search("IWDD!"))
      expect(search("Golgatha")).toEqual(search("golGATHA"))
      expect(search("Iwdd! 180 Golgatha")).toEqual(search("iwdd! 180 golgatha"))
    })

    it("Unnötigen Leerzeichen werden ignoriert", () => {
      expect(search("Iwdd! 180 Golgatha")).toEqual(search(" iwdd!    180 golgatha  "))
    })

    it("Teilweise Treffer werden aufgelistet", () => {
      const results = search("g46")
      const expected: Output[] = [
        iwdd(46), iwdd(460), iwdd(461), iwdd(462), iwdd(463),
      ]
      expect(results).toEqual(expected)
    })

    it("Genaue Treffer stehen oben", () => {
      const results = search("g46")
      expect(results.length).toBeGreaterThan(0)
      expect(results[0]).toEqual(iwdd(46))
    })

    it("Suchergebnisse sind alphabetisch nach Buch sortiert", () => {
      const results = search("365")
      expect(results.length).toEqual(2)
      expect(results[0]).toEqual(loben(365))
      expect(results[0]).toEqual(iwdd(365))
    })

    it("Suchergebnisse sind nach fortlaufender Liednummer sortiert", () => {
      const results = search("65")
      expect(results.length).toBeGreaterThan(1)
      expect(results[0].number).toBeLessThan(results[1].number)
    })

  })

  describe("Die Suche nach Qualifier wird bevorzugt, außer wenn...", () => {

    it("...wird bevorzugt", () => {
      const results = search("b")
      const expected = [
        loben("Ein neuer Tag beginnt"),
      ]
      const notExpected = [
        iwdd("Großer Gott, wir loben dich"),
      ]
      expect(results).toEqual(jasmine.arrayContaining(expected))
      expect(results).not.toEqual(jasmine.arrayContaining(notExpected))
    })

    it("...das erste Input-Zeichen keinem Qualifier entspricht (z.B. nicht 'g' oder 'b' sondern 'd' oder '3')", () => {
      const results = search("d")
      const expected = [
        loben("All die Fülle ist in dir"),
        iwdd("Großer Gott, wir loben dich"),
      ]
      expect(results).toEqual(jasmine.arrayContaining(expected))
    })

    it("...das zweite Zeichen keiner Zahl entspricht (z.B. 'bT')", () => {
      const results = search("bt")
      const expected = [
        loben("Gott gibt Mut zum Leben"),
        iwdd("Steht auf und lobt unsern Gott"),
      ]
      expect(results).toEqual(jasmine.arrayContaining(expected))
    })

  })

})
