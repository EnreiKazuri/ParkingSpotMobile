/* eslint-disable import/no-extraneous-dependencies */
// God bless this absolute gent
// https://github.com/webpack/webpack/issues/4039#issuecomment-686158264

// used by react-app-rewired

module.exports = {
    webpack(config, env) {
        config.resolve.alias['react-native'] = 'react-native-web';
        config.resolve.alias['react-native-maps'] = 'react-native-web-maps';
        return config;
    },
};