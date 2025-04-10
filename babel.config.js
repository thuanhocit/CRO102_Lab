module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
      [
          "module:react-native-dotenv",
          {
              moduleName: "@env",
              path: ".env",
              allowUndefined: true,
          },
      ],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }]
  ],
};

// module.exports = {
//   presets: ["module:metro-react-native-babel-preset"],
//   plugins: [
//       [
//           "module:react-native-dotenv",
//           {
//               moduleName: "@env",
//               path: ".env",
//               allowUndefined: true,
//           },
//       ],
//       ["@babel/plugin-transform-class-properties", { loose: true }],
//       ["@babel/plugin-transform-private-methods", { loose: true }],
//       ["@babel/plugin-transform-private-property-in-object", { loose: true }]
//   ],
// };
