import { IGeometry } from "./../geometry";

export class VelovModel {
  public properties: VelovPropertiesModel;
  public geometry: IGeometry;

  constructor(
    properties: VelovPropertiesModel,
    geometry: IGeometry
  ) {
    this.properties = properties;
    this.geometry = geometry;
  }
}

export class VelovPropertiesModel {
  address2;
  name;
  address;
  commune;
  nmarrond;
  bike_stands;
  status;
  available_bike_stands;
  available_bikes;
  availabilitycode;
  availability;
  gid;

  constructor(
    address2,
    name,
    address,
    commune,
    nmarrond,
    status,
    bike_stands,
    available_bike_stands,
    available_bikes,
    availabilitycode,
    availability,
    gid
  ) {
    this.address2 = address2;
    this.name = name;
    this.address = address;
    this.commune = commune;
    this.nmarrond = nmarrond;
    this.bike_stands = bike_stands;
    this.status = status;
    this.available_bike_stands = available_bike_stands;
    this.available_bikes = available_bikes;
    this.availabilitycode = availabilitycode;
    this.availability = availability;
    this.gid = gid;
  }
}


export class VelovCollection {
  type = "FeatureCollection";

  constructor(public features: Array<VelovModel>) { }
}
