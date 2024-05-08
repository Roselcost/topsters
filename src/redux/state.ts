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
  showBorder: boolean;
  borderColor: string;
  isCircle: boolean;
  borderSize: number;
  borderRadius: number;
  showNumbers: boolean;
  showShadows: boolean;
  font: Font | string;
  textColor: string;
  titlesPosition: Position;
  games: Game[];
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

export interface Game {
  title: string;
  cover: string;
}
