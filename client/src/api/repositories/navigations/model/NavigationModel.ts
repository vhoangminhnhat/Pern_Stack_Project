import { ReactNode } from "react";

export class NavigationModel {
  constructor(
    public name: string,
    public path: string,
    public componentName: string,
    public icon: ReactNode,
    public subMenu: NavigationModel[] = []
  ) {}
}
