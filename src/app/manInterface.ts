import {HeroService} from "./hero.service";

export interface ManInterface {
  id: number;
  name: string;
  children?: ManInterface[];
}

export interface AntiHeroInterface extends ManInterface{
  bug?: string
}

type HeroType = ManInterface | AntiHeroInterface;

export const Hero: HeroType = {
  id: 1,
  name: 'src',
  children: [{
    id: 11,
    name: 'heroes',
    children: [{
      id: 111,
      name: 'heroes.component.css',
    }
    ]
  },
    {
      id: 12,
      name: 'assets',
      // assertion
      children: [{} as ManInterface]
    }
  ]
}
