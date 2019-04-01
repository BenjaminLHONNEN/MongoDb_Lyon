import {IGeometry} from '../geometry';

export class DistrictModel {
  public properties: DistrictPropertiesModel;
  public geometry: IGeometry;


  constructor(properties: DistrictPropertiesModel, geometry: IGeometry) {
    this.properties = properties;
    this.geometry = geometry;
  }
}

export class DistrictPropertiesModel {
  nom;
  theme;
  soustheme;
  identifiant;
  idexterne;
  siret;
  datecreation;
  gid;

  constructor(nom, theme, soustheme, identifiant, idexterne, siret, datecreation, gid) {
    this.nom = nom;
    this.theme = theme;
    this.soustheme = soustheme;
    this.identifiant = identifiant;
    this.idexterne = idexterne;
    this.siret = siret;
    this.datecreation = datecreation;
    this.gid = gid;
  }
}

export class DistrictCollection {
  type = 'FeatureCollection';

  constructor(public features: Array<DistrictModel>) {
  }
}
