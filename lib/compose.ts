const compose = <A, B, C>(f: (b: B) => C) => (g: (a: A) => B) => (a: A): C =>
  f(g(a));

export default compose;
