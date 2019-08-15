;
exports.up = function(knex, Promise) {

  return knex.schema
  .createTable( 'ubicacion', function( t ) {
    t.increments('id');
    t.string('nombre');
  })
  .createTable( 'proveedor', function( t ) {
    t.increments('id');
    t.string('identificacion').notNullable().unique();
    t.string('nombre');
    t.string('direccion');
    t.string('telefono');
  })
  .createTable( 'reclamo', function( t ) {
    t.increments('id');
    t.timestamp('fecha');
    t.string('comentario');
  })
  .createTable( 'cliente', function( t ) {
    t.increments('id');
    t.string('identificacion').notNullable().unique();
    t.string('nombre');
    t.string('apellido');
    t.string('direccion');
  })

  .createTable( 'nicho', function( t ) {
    t.increments('id');
    t.string('nombre');
    t.integer('idubicacion').references('id').inTable('ubicacion');
  })
  .createTable( 'material', function( t ) {
    t.increments('id');
    t.string('nombre');
    t.string('descripcion');
    t.timestamp('fecha_registro');
    t.timestamp('fecha_actualizacion');
    t.decimal('precio');
    t.integer('idnicho').references('id').inTable('nicho');
    t.integer('idproveedor').references('id').inTable('proveedor');
  })
  .createTable( 'pedido', function( t ) {
    t.increments('id');
    t.timestamp('fecha');
    t.decimal('total');
    t.integer('idproveedor').references('id').inTable('proveedor');
  })
  .createTable( 'detalle_pedido', function( t ) {
    t.increments('id');
    t.string('nombre');
    t.integer('cantidad');
    t.decimal('precio');
    t.integer('idpedido').references('id').inTable('pedido');
    t.integer('idmaterial').references('id').inTable('material');
  })
  .createTable( 'albaran', function( t ) {
    t.increments('id');
    t.integer('idpedido').references('id').inTable('pedido');
    t.timestamp('fecha_entrega');
    t.decimal('total');
  })
  .createTable( 'detalle_albaran', function( t ) {
    t.increments('id');
    t.integer('idalbaran').references('id').inTable('albaran');
    t.integer('idmaterial').references('id').inTable('material');
    t.integer('cantidad');
    t.decimal('precio');
  })
  .createTable( 'detalle_reclamo', function( t ) {
    t.increments('id');
    t.integer('cantidad');
    t.decimal('precio_pedido');
    t.decimal('precio_llegada');
    t.integer('idreclamo').references('id').inTable('reclamo');
    t.integer('idpedido').references('id').inTable('pedido');
    t.integer('idmaterial').references('id').inTable('material');
  })
  .createTable( 'factura', function( t ) {
    t.increments('id');
    t.timestamp('fecha');
    t.decimal('total');
    t.integer('idcliente').references('id').inTable('cliente');
  })
  .createTable( 'detalle_factura', function( t ) {
    t.increments('id');
    t.integer('cantidad');
    t.decimal('precio');
    t.decimal('descuento');
    t.integer('idmaterial').references('id').inTable('material');
    t.integer('idfactura').references('id').inTable('factura');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists( 'ubicacion' )
    .dropTableIfExists( 'proveedor' )
    .dropTableIfExists( 'reclamo' )
    .dropTableIfExists( 'cliente' )
    .dropTableIfExists( 'nicho' )
    .dropTableIfExists( 'material' )
    .dropTableIfExists( 'pedido' )
    .dropTableIfExists( 'detalle_pedido' )
    .dropTableIfExists( 'albaran' )
    .dropTableIfExists( 'detalle_albaran' )
    .dropTableIfExists( 'detalle_reclamo' )
    .dropTableIfExists( 'factura' )
    .dropTableIfExists( 'detalle_factura' )
};
