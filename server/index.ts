import { app } from "./app";

class Main {
  constructor() {
    this.init();
  }

  private init() {
    app.settings();
    app.middlewares();
    app.routes();
    app.server();
  }
}

new Main();
