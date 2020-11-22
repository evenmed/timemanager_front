import parseEvents from "../parseEvents";
import { fakeEvent } from "../../testUtils";

describe("parseEvents Fn", () => {
  it("returns empty array and object for invalid values", () => {
    expect(parseEvents(false)).toEqual([[], {}]);
    expect(parseEvents([])).toEqual([[], {}]);
    expect(parseEvents(null)).toEqual([[], {}]);
    expect(parseEvents(["hello", "strings"])).toEqual([[], {}]);
  });
  it("parses events properly", () => {
    const event = fakeEvent();
    expect(parseEvents([event])).toEqual([
      [
        {
          id: "abc123",
          title: "(2 h) Tempore neque dolor",
          start: `${event.date}T00:00:00`,
          end: `${event.date}T02:00:00`,
          extendedProps: {
            notes: "Ab sit illum nostrum minus est.",
          },
        },
      ],
      {
        [event.date]: event.time,
      },
    ]);
  });
});
