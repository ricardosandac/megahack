import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Progress: {
            screens: {
              Progress: 'one',
            },
          },
          Profile: {
            screens: {
              Profile: 'two',
            },         
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'three',
            },         
          },
        },
      },
      NotFound: '*',
    },
  },
};
