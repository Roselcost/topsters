export type State = {
  title: string;
  showTitles: boolean;
  rows: number;
  columns: number;
  backgroundType: BackgroundType;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundOpacity: number;
  gradientDirection: Direction;
  gap: number;
  borderColor: string;
  isCircle: boolean;
  borderSize: number;
  borderRadius: number;
  showNumbers: boolean;
  showShadows: boolean;
  font: Font | string;
  textColor: string;
  titlesPosition: Position;
  items: Item[];
};

export enum BackgroundType {
  color = "Color",
  gradient = "Gradient",
  radialGradient = "Radial gradient",
}

export enum Direction {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  topRight = "top right",
  bottomRight = "bottom right",
  bottomLeft = "bottom left",
  topLeft = "top left",
  center = "center",
}

export enum Font {
  monospace = "Monospace",
  lato = "Lato",
}

export enum Position {
  side = "Side",
  cover = "Cover",
}

export enum Category {
  games = "games",
  music = "music",
  lastfm = "Lastfm",
  movies = "movies",
  tvshows = "TV shows",
  books = "books",
  pictures = "pictures",
}

export interface Item {
  title: string;
  cover: string;
}
