// @Id
// @Column(name = "k_id_parqueadero")
// private String idParqueadero;

// @Column(name = "n_direccion")
// private String direccion;

// @Column(name = "is_disponible")
// private boolean disponible;

// @Column(name = "k_id_localidad")
// private String idLocalidad;

export interface Parking {
  idParqueadero: string
  direccion: string
  disponible: boolean
  idLocalidad: string
}
