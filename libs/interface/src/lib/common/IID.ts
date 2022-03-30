export interface IID {
  /**
   * Primary Generated Unique id
   */
  id?: number;
}

/**
 * Those fields are used for barcode, universal product id, or serial number.
 */
export interface IIDS {
  /**
   * Unique id
   */
  id1?: string;
  /**
   * Unique id
   */
  id2?: string;

  /**
   * Unique id
   */
  id3?: string;
}
