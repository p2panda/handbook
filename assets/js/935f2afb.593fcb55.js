"use strict";(self.webpackChunkhandbook=self.webpackChunkhandbook||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"about":[{"type":"link","label":"Introduction","href":"/handbook/about/","docId":"about/index"},{"type":"link","label":"Things we\'re interested in","href":"/handbook/about/things-were-interested-in","docId":"about/things-were-interested-in"},{"type":"link","label":"Implementations","href":"/handbook/about/implementations","docId":"about/implementations"},{"type":"link","label":"Specification","href":"/handbook/about/specification","docId":"about/specification"},{"type":"link","label":"Roadmap","href":"/handbook/about/roadmap","docId":"about/roadmap"},{"type":"link","label":"Contribute","href":"/handbook/about/contribute","docId":"about/contribute"},{"type":"link","label":"History","href":"/handbook/about/history","docId":"about/history"}],"learn":[{"type":"link","label":"Learn","href":"/handbook/learn/","docId":"learn/index"}],"specification":[{"type":"link","label":"Overview","href":"/handbook/specification/","docId":"specification/index"},{"type":"link","label":"Encoding","href":"/handbook/specification/encoding-data","docId":"specification/encoding-data"},{"type":"category","label":"Data types","items":[{"type":"link","label":"Bamboo","href":"/handbook/specification/data-types/bamboo","docId":"specification/data-types/bamboo"},{"type":"link","label":"Key Pairs","href":"/handbook/specification/data-types/key-pairs","docId":"specification/data-types/key-pairs"},{"type":"link","label":"Operations","href":"/handbook/specification/data-types/operations","docId":"specification/data-types/operations"},{"type":"link","label":"Schemas","href":"/handbook/specification/data-types/schemas","docId":"specification/data-types/schemas"},{"type":"link","label":"Documents","href":"/handbook/specification/data-types/documents","docId":"specification/data-types/documents"},{"type":"link","label":"Document views","href":"/handbook/specification/data-types/document-views","docId":"specification/data-types/document-views"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Core concepts","items":[{"type":"link","label":"Documents","href":"/handbook/specification/core-concepts/concepts-documents","docId":"specification/core-concepts/concepts-documents"},{"type":"link","label":"Schemas","href":"/handbook/specification/core-concepts/concepts-schemas","docId":"specification/core-concepts/concepts-schemas"},{"type":"link","label":"Encryption","href":"/handbook/specification/core-concepts/encryption","docId":"specification/core-concepts/encryption"},{"type":"link","label":"Permissions","href":"/handbook/specification/core-concepts/permissions","docId":"specification/core-concepts/permissions"}],"collapsed":true,"collapsible":true},{"type":"category","label":"APIs","items":[{"type":"link","label":"Overview","href":"/handbook/specification/APIs/apis-overview","docId":"specification/APIs/apis-overview"},{"type":"link","label":"Publishing","href":"/handbook/specification/APIs/publishing","docId":"specification/APIs/publishing"},{"type":"link","label":"Queries","href":"/handbook/specification/APIs/queries","docId":"specification/APIs/queries"},{"type":"link","label":"Replication","href":"/handbook/specification/APIs/replication","docId":"specification/APIs/replication"}],"collapsed":true,"collapsible":true},{"type":"category","label":"Networking","items":[{"type":"link","label":"Clients and nodes","href":"/handbook/specification/networking/clients-nodes","docId":"specification/networking/clients-nodes"},{"type":"link","label":"Discovery","href":"/handbook/specification/networking/discovery","docId":"specification/networking/discovery"},{"type":"link","label":"Replication Protocol","href":"/handbook/specification/networking/replication-protocol","docId":"specification/networking/replication-protocol"}],"collapsed":true,"collapsible":true}]},"docs":{"about/contribute":{"id":"about/contribute","title":"Contribute","description":"How to contribute","sidebar":"about"},"about/history":{"id":"about/history","title":"History","description":"- history of the project","sidebar":"about"},"about/implementations":{"id":"about/implementations","title":"Implementations","description":"- we have built p2panda-rs, a Rust implementation of the p2panda specification","sidebar":"about"},"about/index":{"id":"about/index","title":"Introduction","description":"- here you can find out","sidebar":"about"},"about/roadmap":{"id":"about/roadmap","title":"Roadmap","description":"- this is a roadmap for the whole project","sidebar":"about"},"about/specification":{"id":"about/specification","title":"Specification","description":"- the p2panda specification describes the protocol and the interfaces required to be implemented","sidebar":"about"},"about/things-were-interested-in":{"id":"about/things-were-interested-in","title":"Things we\'re interested in","description":"Previous ideas:","sidebar":"about"},"faq":{"id":"faq","title":"FAQ","description":""},"learn/index":{"id":"learn/index","title":"Learn","description":"","sidebar":"learn"},"libraries/index":{"id":"libraries/index","title":"Libraries","description":""},"links":{"id":"links","title":"Links","description":""},"specification/APIs/apis-overview":{"id":"specification/APIs/apis-overview","title":"Overview","description":"- clients send queries to nodes in order to publish new entries and query materialised documents","sidebar":"specification"},"specification/APIs/publishing":{"id":"specification/APIs/publishing","title":"Publishing","description":"- clients use two GraphQL operations for publishing entries:","sidebar":"specification"},"specification/APIs/queries":{"id":"specification/APIs/queries","title":"Queries","description":"- The GraphQL schema of a node changes depending on the schemas that are available on the node.","sidebar":"specification"},"specification/APIs/replication":{"id":"specification/APIs/replication","title":"Replication","description":"- this api consists of GraphQL queries for other nodes to ask about the state of bamboo logs, entries and payloads","sidebar":"specification"},"specification/core-concepts/concepts-documents":{"id":"specification/core-concepts/concepts-documents","title":"Documents","description":"Documents are what we use to represent mutable data on the p2panda network. Authors can create, update and delete documents.","sidebar":"specification"},"specification/core-concepts/concepts-schemas":{"id":"specification/core-concepts/concepts-schemas","title":"Schemas","description":"Schemas are used to describe the shape of data on a p2panda network. Only data which matches an existing schema can be publised.","sidebar":"specification"},"specification/core-concepts/encryption":{"id":"specification/core-concepts/encryption","title":"Encryption","description":"- p2panda uses MLS for encryption, which allows efficient group encryption with forward-secrecy and post-compromise security","sidebar":"specification"},"specification/core-concepts/permissions":{"id":"specification/core-concepts/permissions","title":"Permissions","description":"Key Groups","sidebar":"specification"},"specification/data-types/bamboo":{"id":"specification/data-types/bamboo","title":"Bamboo","description":"- requirements in this section refer only to how p2panda specifies use of bamboo","sidebar":"specification"},"specification/data-types/document-views":{"id":"specification/data-types/document-views","title":"Document views","description":"- document views represent the immutable state of a document at a particular point in its history of edits","sidebar":"specification"},"specification/data-types/documents":{"id":"specification/data-types/documents","title":"Documents","description":"- A Document is a high-level mutable, multi-writer data type constructed from a linked graph of operations.","sidebar":"specification"},"specification/data-types/key-pairs":{"id":"specification/data-types/key-pairs","title":"Key Pairs","description":"Key pairs MUST use ED25519 keys.","sidebar":"specification"},"specification/data-types/operations":{"id":"specification/data-types/operations","title":"Operations","description":"- Operations represent atomic data changes.","sidebar":"specification"},"specification/data-types/schemas":{"id":"specification/data-types/schemas","title":"Schemas","description":"- schemas are used to describe and validate the format in which data is published","sidebar":"specification"},"specification/encoding-data":{"id":"specification/encoding-data","title":"Encoding","description":"Hexadecimal","sidebar":"specification"},"specification/index":{"id":"specification/index","title":"Overview","description":"Requirements","sidebar":"specification"},"specification/networking/clients-nodes":{"id":"specification/networking/clients-nodes","title":"Clients and nodes","description":"- p2panda has a clear separation of clients and nodes to allow flexible setups and make client development easier","sidebar":"specification"},"specification/networking/discovery":{"id":"specification/networking/discovery","title":"Discovery","description":"Discovery is in specification phase and has not been implemented yet.","sidebar":"specification"},"specification/networking/replication-protocol":{"id":"specification/networking/replication-protocol","title":"Replication Protocol","description":"- replication is the process by which nodes exchange entries and operations to eventually converge all to the same state","sidebar":"specification"},"tutorials/index":{"id":"tutorials/index","title":"Tutorials","description":""}}}')}}]);