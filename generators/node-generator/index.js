const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'repo name ?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'a short description ?',
        default: 'An awesome project'
      },
      {
        type: 'input',
        name: 'version',
        message: 'repo version ?',
        default: '0.0.1'
      }
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath(`.editorconfig`),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath(`.gitignore`),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('.yarnclean'),
      this.destinationPath('.yarnclean'),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.answers
    );
  }

  install() {
    this.yarnInstall(
      [
        'pre-commit',
        'xo'
      ],
      {dev: true}
    );
    this.yarnInstall([
      'ramda'
    ]);
  }

  end() {
    this.composeWith(require.resolve('generator-git-init/generators/app'), {
      commit: 'Initial commit'
    });
  }
};
