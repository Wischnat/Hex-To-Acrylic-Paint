import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Paint {
  @Property()
  manufacturer: string;

  @Property()
  category: string;

  @Property()
  type: string;

  @PrimaryKey()
  variant_id: number;

  @Property()
  color_name: string;

  @Property()
  color_hex: string;

  @Property()
  image: string;

  constructor({
    manufacturer,
    category,
    type,
    variant_id,
    color_name,
    color_hex,
    image,
  }: PaintDTO) {
    this.manufacturer = manufacturer;
    this.category = category;
    this.type = type;
    this.variant_id = variant_id;
    this.color_name = color_name;
    this.color_hex = color_hex;
    this.image = image;
  }
}

export type PaintDTO = {
  manufacturer: string;
  category: string;
  type: string;
  variant_id: number;
  color_name: string;
  color_hex: string;
  image: string;
};
