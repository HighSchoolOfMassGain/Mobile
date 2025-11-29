// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),   // желательно оставить это
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@shared": "./src/shared",
            "@pages": "./src/pages",
            "@features": "./src/features",
            "@widgets": "./src/widgets",
            "@entities": "./src/entities",
            "@app": "./src/app",
            "@assets": "./assets",
          },
        },
      ],
      "react-native-reanimated/plugin", // последним
    ],
  };
};
