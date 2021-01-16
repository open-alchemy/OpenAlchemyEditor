import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AceModule } from 'ngx-ace-wrapper';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {
  SeedService,
  SpecService,
  ArtifactService,
} from '@open-alchemy/editor-sdk';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';

import { editorReducer } from './services/editor/editor.reducer';
import { EditorEffects } from './services/editor/editor.effects';
import { packageReducer } from './services/package/package.reducer';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { ModelsResultComponent } from './components/models-result/models-result.component';
import { ModelResultComponent } from './components/model/model-result/model-result.component';
import { PropertyResultComponent } from './components/property/property-result/property-result.component';
import { ResultComponent } from './components/result/result.component';
import { ModelResultBadgeComponent } from './components/model/model-result-badge/model-result-badge.component';
import { UnmanagedModelsResultComponent } from './components/unmanaged-models-result/unmanaged-models-result.component';
import { UnmanagedModelResultComponent } from './components/unmanaged-model-result/unmanaged-model-result.component';
import { ModelArtifactsComponent } from './components/model/model-artifacts/model-artifacts.component';
import { ModelArtifactsExpansionComponent } from './components/model/model-artifacts-expansion/model-artifacts-expansion.component';
import { ModelArtifactsTitleComponent } from './components/model/model-artifacts-title/model-artifacts-title.component';
import { ModelArtifactsDetailComponent } from './components/model/model-artifacts-detail/model-artifacts-detail.component';
import { DescriptionComponent } from './components/artifact/description/description.component';
import { TablenameComponent } from './components/artifact/tablename/tablename.component';
import { NullableComponent } from './components/artifact/nullable/nullable.component';
import { InheritsComponent } from './components/artifact/inherits/inherits.component';
import { ParentComponent } from './components/artifact/parent/parent.component';
import { MixinsComponent } from './components/artifact/mixins/mixins.component';
import { KwargsComponent } from './components/artifact/kwargs/kwargs.component';
import { ForeignKeyKwargsComponent } from './components/artifact/foreign-key-kwargs/foreign-key-kwargs.component';
import { RequiredComponent } from './components/artifact/required/required.component';
import { ReadOnlyComponent } from './components/artifact/read-only/read-only.component';
import { WriteOnlyComponent } from './components/artifact/write-only/write-only.component';
import { PrimaryKeyComponent } from './components/artifact/primary-key/primary-key.component';
import { AutoincrementComponent } from './components/artifact/autoincrement/autoincrement.component';
import { IndexComponent } from './components/artifact/index/index.component';
import { UniqueComponent } from './components/artifact/unique/unique.component';
import { DefaultComponent } from './components/artifact/default/default.component';
import { ServerDefaultComponent } from './components/artifact/server-default/server-default.component';
import { ForeignKeyComponent } from './components/artifact/foreign-key/foreign-key.component';
import { FormatComponent } from './components/artifact/format/format.component';
import { MaxLengthComponent } from './components/artifact/max-length/max-length.component';
import { TypeComponent } from './components/artifact/type/type.component';
import { SchemaComponent } from './components/artifact/schema/schema.component';
import { PropertiesComponent } from './components/artifact/properties/properties.component';
import { BackrefPropertyComponent } from './components/artifact/backref-property/backref-property.component';
import { ForeignKeyPropertyComponent } from './components/artifact/foreign-key-property/foreign-key-property.component';
import { SecondaryComponent } from './components/artifact/secondary/secondary.component';
import { PropertyArtifactsComponent } from './components/property/property-artifacts/property-artifacts.component';
import { PropertyArtifactsTitleComponent } from './components/property/property-artifacts-title/property-artifacts-title.component';
import { PropertyArtifactsDetailComponent } from './components/property/property-artifacts-detail/property-artifacts-detail.component';
import { PropertyArtifactsExpansionComponent } from './components/property/property-artifacts-expansion/property-artifacts-expansion.component';
import { SimplePropertyArtifactsComponent } from './components/property/simple-property-artifacts/simple-property-artifacts.component';
import { JsonPropertyArtifactsComponent } from './components/property/json-property-artifacts/json-property-artifacts.component';
import { RelationshipPropertyArtifactsComponent } from './components/property/relationship-property-artifacts/relationship-property-artifacts.component';
import { BackrefPropertyArtifactsComponent } from './components/property/backref-property-artifacts/backref-property-artifacts.component';
import { NotManyToManyRelationshipPropertyArtifactsComponent } from './components/property/not-many-to-many-relationship-property-artifacts/not-many-to-many-relationship-property-artifacts.component';
import { ManyToManyRelationshipPropertyArtifactsComponent } from './components/property/many-to-many-relationship-property-artifacts/many-to-many-relationship-property-artifacts.component';
import { SeedComponent } from './components/seed/seed.component';
import { CompositeIndexItemComponent } from './components/artifact/composite-index/composite-index-item/composite-index-item.component';
import { CompositeIndexComponent } from './components/artifact/composite-index/composite-index/composite-index.component';
import { CompositeUniqueItemComponent } from './components/artifact/composite-unique/composite-unique-item/composite-unique-item.component';
import { CompositeUniqueComponent } from './components/artifact/composite-unique/composite-unique/composite-unique.component';
import { ErrorComponent } from './components/error/error.component';
import { BaseComponent } from './components/base/base.component';
import { PackageBaseComponent } from './components/package/package-base/package-base.component';
import { SpecInformationComponent } from './components/package/spec-information/spec-information.component';
import { SaveComponent } from './components/package/save/save.component';
import { CheckComponent } from './components/check/check.component';
import { SignInCompleteComponent } from './components/sign-in-complete/sign-in-complete.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ModelsResultComponent,
    ModelResultComponent,
    PropertyResultComponent,
    ResultComponent,
    ModelResultBadgeComponent,
    UnmanagedModelsResultComponent,
    UnmanagedModelResultComponent,
    ModelArtifactsComponent,
    DescriptionComponent,
    ModelArtifactsExpansionComponent,
    ModelArtifactsTitleComponent,
    ModelArtifactsDetailComponent,
    TablenameComponent,
    NullableComponent,
    InheritsComponent,
    ParentComponent,
    MixinsComponent,
    KwargsComponent,
    ForeignKeyKwargsComponent,
    ReadOnlyComponent,
    WriteOnlyComponent,
    PrimaryKeyComponent,
    AutoincrementComponent,
    IndexComponent,
    UniqueComponent,
    DefaultComponent,
    ServerDefaultComponent,
    ForeignKeyComponent,
    FormatComponent,
    MaxLengthComponent,
    TypeComponent,
    SchemaComponent,
    PropertiesComponent,
    BackrefPropertyComponent,
    ForeignKeyPropertyComponent,
    SecondaryComponent,
    PropertyArtifactsComponent,
    PropertyArtifactsTitleComponent,
    PropertyArtifactsDetailComponent,
    PropertyArtifactsExpansionComponent,
    SimplePropertyArtifactsComponent,
    JsonPropertyArtifactsComponent,
    RelationshipPropertyArtifactsComponent,
    BackrefPropertyArtifactsComponent,
    RequiredComponent,
    NotManyToManyRelationshipPropertyArtifactsComponent,
    ManyToManyRelationshipPropertyArtifactsComponent,
    SeedComponent,
    CompositeIndexItemComponent,
    CompositeIndexComponent,
    CompositeUniqueItemComponent,
    CompositeUniqueComponent,
    ErrorComponent,
    BaseComponent,
    PackageBaseComponent,
    SpecInformationComponent,
    SaveComponent,
    CheckComponent,
    SignInCompleteComponent,
    LoginComponent,
    ErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AceModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,

    StoreModule.forRoot({ editor: editorReducer, package: packageReducer }),
    EffectsModule.forRoot([EditorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    OAuthModule.forRoot(),
  ],
  providers: [
    { provide: SeedService, useValue: new SeedService() },
    { provide: SpecService, useValue: new SpecService() },
    { provide: ArtifactService, useValue: new ArtifactService() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
