const { SchemaDirectiveVisitor } = require('graphql-tools')
export default class UndocumentedDirective extends SchemaDirectiveVisitor {

  //****************************************
  // These methods are standard SchemaDirectiveVisitor
  // methods to be overridden. They allow us to "mark"
  // the things that were decorated with this directive
  // by setting the `isDocumented` property to `true`
  //

  visitObject (subject:any) {
    subject.isUndocumented = true
  }

  visitEnum (subject:any) {
    subject.isUndocumented = true
  }

  visitFieldDefinition (subject:any) {
    subject.isUndocumented = true
  }

  //
  //****************************************

  //****************************************
  // These static methods are used by the
  // graphql-introspection-filtering library to decide
  // whether or not to show or hide things based on their
  // boolean responses
  //

  static visitTypeIntrospection (type:any) {
    return UndocumentedDirective.isAccessible(type)
  }

  static visitFieldIntrospection (field:any) {
    return UndocumentedDirective.isAccessible(field)
  }

  // Don't show that this directive itself exists
  static visitDirectiveIntrospection ({ name }:any) {
    return name !== 'undocumented'
  }

  //
  //****************************************

  // If the thing has not been marked by the directive to
  // be undocumented, then it's accessible
  static isAccessible (thing:any) {
    return !thing.isUndocumented
  }
}