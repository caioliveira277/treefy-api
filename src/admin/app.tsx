import Logo from "./extensions/treefy.png";
import favicon from "./extensions/treefy.ico";

export default {
  config: {
    auth: {
      logo: Logo,
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: Logo,
    },
    theme: {
      colors: {
        primary500: "#56ab79",
        primary600: "#56ab79",
        primary700: "#4ABC86",
        buttonPrimary500: "#4ABC86",
        buttonPrimary600: "#4ABC86",
      },
    },
    locales: ["en", 'pt-BR'],
    translations: {
    },
  },

  bootstrap() {},
};
