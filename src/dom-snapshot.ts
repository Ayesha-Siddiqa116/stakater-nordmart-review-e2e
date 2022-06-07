import { Selector } from "testcafe";

type NodeValueCB = (node: HTMLElement) => any;

interface ISnapshotConfig {
  name: string;
  cssSelector: string;
  contentAttrs?: { [key: string]: NodeValueCB };
}

interface IDOMSnapshotSelector extends Selector {
  match(configs: ISnapshotConfig[], expected: any): Promise<any>;
}

export const SelectSnapshot = (cssSelector: string) => {
  return Selector(cssSelector).addCustomMethods({
    match: (selectedNode: HTMLElement, configs: ISnapshotConfig[], expected?: any) => {
      const lodash = window["_"];

      const toJSON = (node: HTMLElement, obj: any) => {
        if (!node) {
          return obj;
        }

        const config = configs.find((c) => node?.matches(c.cssSelector));
        let next;
        if (config) {
          const nodes = Array.from(selectedNode.querySelectorAll(config.cssSelector));
          const idx = nodes.indexOf(node);
          next = {};
          for (const attr in config?.contentAttrs) {
            next[attr] = config?.contentAttrs[attr](node);
          }

          if (!obj[config.name]) {
            // Produce object for single value
            obj[config.name] = next;
          } else if (lodash.isArray(obj[config.name])) {
            obj[config.name] = obj[config.name].concat(next);
          } else {
            // Produce array for multiple values
            obj[config.name] = [obj[config.name], next];
          }
        } else {
          next = obj;
        }

        for (let i = 0; i < node.children.length; i++) {
          toJSON(node.children.item(i) as any, next);
        }
      };

      const snapshot = {};
      toJSON(selectedNode, snapshot);
      const match = lodash.isMatch(snapshot, expected);
      return expected
        ? match ||
            `\n\n Not match expected: ${JSON.stringify(expected, null, 3)} \n\n snapshot: ${JSON.stringify(
              snapshot,
              null,
              3,
            )}`
        : snapshot;
    },
  }) as IDOMSnapshotSelector;
};
