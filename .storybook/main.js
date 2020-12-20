//FIXME: scss 적용이 안된채로 보여짐. @storybook/preset-scss사용시 에러 발생

const path = require('path');
module.exports = {
  stories: ['../src/stories/*.story.js'],
  addons: [
    '@storybook/addon-a11y',
    // '@storybook/preset-scss',
    '@storybook/preset-create-react-app',
  ],
};
