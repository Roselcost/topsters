import {
  BackgroundType,
  Direction,
  Font,
  Position,
  Category,
} from "./state";

describe("BackgroundType enum", () => {
  it('should have "color" key with value "Color"', () => {
    expect(BackgroundType.color).toBe("Color");
  });

  it('should have "gradient" key with value "Gradient"', () => {
    expect(BackgroundType.gradient).toBe("Gradient");
  });

  it('should have "radialGradient" key with value "Radial gradient"', () => {
    expect(BackgroundType.radialGradient).toBe("Radial gradient");
  });

  it("should have exactly 3 members", () => {
    expect(Object.keys(BackgroundType).length).toBe(3);
  });
});

describe("Direction enum", () => {
  it('should have "top" key with value "top"', () => {
    expect(Direction.top).toBe("top");
  });

  it('should have "right" key with value "right"', () => {
    expect(Direction.right).toBe("right");
  });

  it('should have "bottom" key with value "bottom"', () => {
    expect(Direction.bottom).toBe("bottom");
  });

  it('should have "left" key with value "left"', () => {
    expect(Direction.left).toBe("left");
  });

  it('should have "topRight" key with value "top right"', () => {
    expect(Direction.topRight).toBe("top right");
  });

  it('should have "bottomRight" key with value "bottom right"', () => {
    expect(Direction.bottomRight).toBe("bottom right");
  });

  it('should have "bottomLeft" key with value "bottom left"', () => {
    expect(Direction.bottomLeft).toBe("bottom left");
  });

  it('should have "topLeft" key with value "top left"', () => {
    expect(Direction.topLeft).toBe("top left");
  });

  it('should have "center" key with value "center"', () => {
    expect(Direction.center).toBe("center");
  });

  it("should have exactly 9 members", () => {
    expect(Object.keys(Direction).length).toBe(9);
  });
});

describe("Font enum", () => {
  it('should have "monospace" key with value "Monospace"', () => {
    expect(Font.monospace).toBe("Monospace");
  });

  it('should have "lato" key with value "Lato"', () => {
    expect(Font.lato).toBe("Lato");
  });

  it("should have exactly 2 members", () => {
    expect(Object.keys(Font).length).toBe(2);
  });
});

describe("Position enum", () => {
  it('should have "side" key with value "Side"', () => {
    expect(Position.side).toBe("Side");
  });

  it('should have "cover" key with value "Cover"', () => {
    expect(Position.cover).toBe("Cover");
  });

  it("should have exactly 2 members", () => {
    expect(Object.keys(Position).length).toBe(2);
  });
});

describe("Category enum", () => {
  it('should have "games" key with value "games"', () => {
    expect(Category.games).toBe("games");
  });

  it('should have "music" key with value "music"', () => {
    expect(Category.music).toBe("music");
  });

  it('should have "lastfm" key with value "Lastfm"', () => {
    expect(Category.lastfm).toBe("Lastfm");
  });

  it('should have "movies" key with value "movies"', () => {
    expect(Category.movies).toBe("movies");
  });

  it('should have "tvshows" key with value "TV shows"', () => {
    expect(Category.tvshows).toBe("TV shows");
  });

  it('should have "books" key with value "books"', () => {
    expect(Category.books).toBe("books");
  });

  it('should have "pictures" key with value "pictures"', () => {
    expect(Category.pictures).toBe("pictures");
  });

  it("should have exactly 7 members", () => {
    expect(Object.keys(Category).length).toBe(7);
  });
});
