import {IGeometry} from '../geometry';

export class TouristicAreaModel {
  public properties: TouristicAreaPropertiesModel;
  public geometry: IGeometry;

  constructor(properties: TouristicAreaPropertiesModel, geometry: IGeometry) {
    this.properties = properties;
    this.geometry = geometry;
  }
}

export class TouristicAreaPropertiesModel {
  public type_detail;
  public fax;
  public telephonefax;
  public facebook;
  public classement;
  public ouverture;
  public tarifsenclair;
  public tarifsmin;
  public tarifsmax;
  public id_sitra1;
  public type;
  public nom;
  public adresse;
  public codepostal;
  public commune;
  public telephone;
  public email;
  public siteweb;
  public producteur;
  public gid;
  public date_creation;
  public last_update;
  public last_update_fme;

  constructor(type_detail, fax, telephonefax, facebook, classement, ouverture, tarifsenclair, tarifsmin, tarifsmax, id_sitra1, type, nom, adresse, codepostal, commune, telephone, email, siteweb, producteur, gid, date_creation, last_update, last_update_fme) {
    this.type_detail = type_detail;
    this.fax = fax;
    this.telephonefax = telephonefax;
    this.facebook = facebook;
    this.classement = classement;
    this.ouverture = ouverture;
    this.tarifsenclair = tarifsenclair;
    this.tarifsmin = tarifsmin;
    this.tarifsmax = tarifsmax;
    this.id_sitra1 = id_sitra1;
    this.type = type;
    this.nom = nom;
    this.adresse = adresse;
    this.codepostal = codepostal;
    this.commune = commune;
    this.telephone = telephone;
    this.email = email;
    this.siteweb = siteweb;
    this.producteur = producteur;
    this.gid = gid;
    this.date_creation = date_creation;
    this.last_update = last_update;
    this.last_update_fme = last_update_fme;
  }
}

export class TouristicAreaCollection {
  type = 'FeatureCollection';

  constructor(public features: Array<TouristicAreaModel>) {
  }
}
