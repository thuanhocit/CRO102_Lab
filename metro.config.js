const { getDefaultConfig } = require("expo/metro-config");

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("png", "jpg", "jpeg", "gif", "webp");
module.exports = wrapWithReanimatedMetroConfig(config);