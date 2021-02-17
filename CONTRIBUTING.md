# Contributing

If you want to contribute to this repository please check with the authors
before proceeding with any development to ensure that:

* Your proposed change is not already in development by another contributor.
* Your proposed change fits within the scope envisged for this component by the authors.
* Your implementation approach resonates with the development principals established for this component.

Once you have agreed the scope of functionallity and the implementation design,
you can fork the repository, write and test your changes, then submit a Pull Request.
The component authors will review your Pull Request, and work with you to get your
code to a point where it can be merged into the main branch.

# Development environment

We use MacOS for our development, and this is the easiest environment to set up 
for Node.js development. For this repository Node.js is used to transpile the 
latest ES syntax into ES5 for distribution. Node.js is also used to run Storybook 
for testing the component prior to release.

This is an example of a bash session to get started:
```bash
$ git clone https://github.com/Bikeman868/react-svg-pie
$ cd react-svg-pie
$ npm ci
```

# Testing

We have plans to build unit tests with Jest eventually.

For now the testing is done using Storybook. Start Storybook with the command `npm run storybook`.

# Release process

These are the steps for releasing a new version.

1. Update the version number using the `npm version` command.
2. Push the commit to GitHub with the tags option.
3. Transpile the ES6 syntax code in the `./src` folder to ES5 syntax in `./dist`.
4. Publish the code to npm using the `npm publish` command.

This is an example bash session for relasing a patch version
```bash
$ git add .
$ git commit -m "My check in comment"
$ npm version patch
$ git push --tags
$ npm run build
$ npm publish
```
