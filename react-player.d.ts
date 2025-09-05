declare module "react-player" {
  import * as React from "react";

  export interface ReactPlayerProps {
    url: string;
    controls?: boolean;
    width?: string | number;
    height?: string | number;
    [key: string]: any;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
