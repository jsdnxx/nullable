# Changelog

## 2.0.0

Changed format of `Nullable#toString()` to return a string of the wrapped value.
Previously, `Nullable.of(4).toString()` would return `<4>?`, a format which was intended to be easier to inspect.
However, in practice, especially in templating scenarios, it's desirable to get a value you can work with. In 2.0,
`Nullable.of(4).toString()` returns `'4'` and `Nullable.empty().toString()` returns `''`.

## 1.0.1

## 1.0.0

## 0.1.0
--