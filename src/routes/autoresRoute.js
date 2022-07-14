import controller from "../controllers/autoresController";

export default (app) => {
  app.get("/autores", controller.getAutores);
  app.get("/autores/:id", controller.getAutores);
  app.post("/autores", controller.persistir);
  app.post("/autores/:id", controller.persistir);
}