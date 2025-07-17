declare module 'react-scroll' {
  export interface LinkProps {
    to: string;
    smooth?: boolean;
    duration?: number;
    offset?: number;
    children: React.ReactNode;
  }

  export const Link: React.FC<LinkProps>;
}

declare module 'tsparticles' {
  export const loadFull: (engine: any) => Promise<void>;
  export const tsParticles: any;
}