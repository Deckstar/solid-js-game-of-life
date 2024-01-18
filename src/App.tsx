import type { Component } from "solid-js";

import classes from "./App.module.css";
import GameOfLife from "./components/GameOfLife";
import logo from "./logo.svg";

const App: Component = () => {
  return (
    <main class={classes.App}>
      <div class={classes.header}>
        <img src={logo} class={classes.logo} alt="logo" />
        <p>
          John Conway's{" "}
          <a
            class={classes.link}
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            Game of Life
          </a>
          , in{" "}
          <a class={classes.link} href="https://www.solidjs.com">
            Solid JS
          </a>
          .
        </p>
      </div>

      <GameOfLife />
    </main>
  );
};

export default App;
