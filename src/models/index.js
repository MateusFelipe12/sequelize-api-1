import Categoria from "./Categoria";
import Autor from "./Autor"

(async () => {
 await Categoria.sync()//{ force: true });
 await Autor.sync() //{ force: true});
})()