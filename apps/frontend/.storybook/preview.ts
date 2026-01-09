import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/theme.css";
import "../src/index.css";

// MSWをStorybook全体で有効化
initialize({
  onUnhandledRequest: "bypass",
  // GitHub Pages 配信時にサブパス配下でも参照できるよう相対パス指定
  serviceWorker: { url: "./mockServiceWorker.js" },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
  loaders: [mswLoader],
};

export default preview;
