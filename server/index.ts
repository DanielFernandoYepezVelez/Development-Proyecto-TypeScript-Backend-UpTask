import { app } from "./app";

class Main {
  constructor() {
    this.init();
  }

  private init() {
    app.middlewares();
    app.routes();
    app.server();
  }
}

new Main();