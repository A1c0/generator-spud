const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.action = '';

    this.argument('action', {type: String, required: false, default: 'help'});
  }

  _private_listing() {
    return new Promise(async resolve => {
      const answers = await this.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What kind of project you want to generate ?',
          choices: ['node', 'python']
        }
      ]);
      this.options.action = answers.action;
      this.default();
      resolve();
    });
  }

  async default() {
    switch (this.options.action) {
      case 'node':
        this.composeWith(require.resolve('../node-generator'), {});
        break;
      case 'python':
        this.log('not ready yet');
        break;
      default:
        await this._private_listing();
        break;
    }
  }
};
