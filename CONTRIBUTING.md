## Bootstrapping

This a [JavaScript](https://help.github.com/en/articles/about-actions#types-of-actions) action but uses [TypeScript](https://www.typescriptlang.org/docs/home.html) to generate that JavaScript.

You can bootstrap your environment with a modern version of npm and by running `yarn` at the root of this repo.

## Testing

Tests can be found under under `__tests__` directory and are runnable with the `npm t` command.

## Source code

Source code can be found under the `src` directory. Running `yarn run build && yarn run package` will generate the JavaScript that will run within GitHub workflows.

## Formatting

A minimal attempt at keeping a consistent code style is can be applied by running `yarn run fmt`.