export {};

declare global {
  interface Window {
    treeAPI: {
      [x: string]: any;
      listTrees: () => Promise<string[]>;
      createTree: (treeName: string) => Promise<void>;
    };
  }
}
