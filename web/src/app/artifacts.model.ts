export interface ArtifactsPropertyModelBase {
  type: 'SIMPLE' | 'JSON' | 'RELATIONSHIP' | 'BACKREF';
  required?: boolean;
  description?: string;
}

export interface ArtifactsSimplePropertyModel
  extends ArtifactsPropertyModelBase {
  type: 'SIMPLE';
  required: boolean;
  open_api: {
    type: string;
    format?: string;
    max_length?: number;
    nullable?: boolean;
    default?: number | string | boolean;
    read_only?: boolean;
    write_only?: boolean;
  };
  extension: {
    primary_key: boolean;
    autoincrement?: boolean;
    index?: boolean;
    unique?: boolean;
    foreign_key?: string;
    kwargs?: { [key: string]: any };
    foreign_key_kwargs?: { [key: string]: any };
  };
}

export interface ArtifactsJsonPropertyModel extends ArtifactsPropertyModelBase {
  type: 'JSON';
  required: boolean;
  open_api: {
    nullable?: boolean;
    read_only?: boolean;
    write_only?: boolean;
  };
  extension: {
    primary_key: boolean;
    index?: boolean;
    unique?: boolean;
    foreign_key?: string;
    kwargs?: { [key: string]: any };
    foreign_key_kwargs?: { [key: string]: any };
  };
  schema: any;
}

export interface ArtifactsRelationshipPropertyModel
  extends ArtifactsPropertyModelBase {
  type: 'RELATIONSHIP';
  sub_type: 'MANY_TO_ONE' | 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY';
  parent: string;
  backref_property?: string;
  kwargs?: { [key: string]: any };
  write_only?: boolean;
  required: boolean;
}

export interface ArtifactsNotManyToManyRelationshipPropertyModel
  extends ArtifactsRelationshipPropertyModel {
  sub_type: 'MANY_TO_ONE' | 'ONE_TO_ONE' | 'ONE_TO_MANY';
  foreign_key: string;
  foreign_key_property: string;
}

export interface ArtifactsOneToManyRelationshipPropertyModel
  extends ArtifactsNotManyToManyRelationshipPropertyModel {
  sub_type: 'ONE_TO_MANY';
}

export interface ArtifactsXToOneRelationshipPropertyModel
  extends ArtifactsNotManyToManyRelationshipPropertyModel {
  sub_type: 'MANY_TO_ONE' | 'ONE_TO_ONE';
  nullable?: boolean;
}

export interface ArtifactsManyToOneRelationshipPropertyModel
  extends ArtifactsXToOneRelationshipPropertyModel {
  sub_type: 'MANY_TO_ONE';
}

export interface ArtifactsOneToOneRelationshipPropertyModel
  extends ArtifactsXToOneRelationshipPropertyModel {
  sub_type: 'ONE_TO_ONE';
}

export interface ArtifactsManyToManyRelationshipPropertyModel
  extends ArtifactsRelationshipPropertyModel {
  sub_type: 'MANY_TO_MANY';
  secondary: string;
}

export interface ArtifactsBackrefPropertyModel
  extends ArtifactsPropertyModelBase {
  type: 'BACKREF';
  sub_type: 'OBJECT' | 'ARRAY';
  properties: string[];
  schema: { [key: string]: any };
}

export type ArtifactsRelationshipModel =
  | ArtifactsManyToOneRelationshipPropertyModel
  | ArtifactsOneToOneRelationshipPropertyModel
  | ArtifactsOneToManyRelationshipPropertyModel
  | ArtifactsManyToManyRelationshipPropertyModel;

export type ArtifactsPropertyArtifactsModel =
  | ArtifactsSimplePropertyModel
  | ArtifactsJsonPropertyModel
  | ArtifactsRelationshipModel
  | ArtifactsBackrefPropertyModel;

export interface ArtifactsPropertyModel {
  artifacts: ArtifactsPropertyArtifactsModel;
}

export interface ArtifactsPropertiesModel {
  [key: string]: ArtifactsPropertyModel;
}

export interface ArtifactsCompositeIndexItemModel {
  expressions: string[];
  name?: string;
  unique?: boolean;
}

export type ArtifactsCompositeIndexModel = ArtifactsCompositeIndexItemModel[];

export interface ArtifactsCompositeUniqueItemModel {
  columns: string[];
  name?: string;
}

export type ArtifactsCompositeUniqueModel = ArtifactsCompositeUniqueItemModel[];

export interface ArtifactsModelArtifactsModel {
  tablename: string;
  inherits?: boolean;
  parent?: string;
  description?: string;
  mixins?: string[];
  kwargs?: { [key: string]: any };
  composite_index?: ArtifactsCompositeIndexModel;
  composite_unique?: ArtifactsCompositeUniqueModel;
}

export interface ArtifactsModelModel {
  artifacts: ArtifactsModelArtifactsModel;

  properties?: ArtifactsPropertiesModel;
}

export interface ArtifactsModelsModel {
  [key: string]: ArtifactsModelModel;
}

export interface ArtifactsModel {
  models?: ArtifactsModelsModel;
}
