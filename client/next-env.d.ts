/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
    };
  }
}
