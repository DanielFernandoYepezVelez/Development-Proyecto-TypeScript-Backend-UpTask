export class PasswordUserDB {
  private cadena: string = '';
  private finalCadena: number = 0;
  private result: string = '';

  constructor(private query: any) {
    this.init();
  }

  /* Obtener La Contraseña Del Usuario De La Base De Datos
  Por El Momento La Parseo A Un String Y Aplico Métodos Para
  Cadenas De Texto, Debe Existir Otra Solución Mas Optima,
  Pero Por El Momento Esta Solución Me Permite Seguir Con El
  Proyecto 
  */
  public init(finalString?: any, inicioString?: any) {
    this.cadena = JSON.stringify(this.query);
    this.finalCadena = this.cadena.length - finalString;
    this.result = this.cadena.substring(inicioString, this.finalCadena);

    return this.result;
  }
}
